import React from 'react';
import TabsBlock from './TabsBlock';
import ConsoleFooter from './ConsoleFooter';
import ConsoleFields from './ConsoleFields';
import {asyncRequestAction, asyncUpdateRequestAction} from '../../store/sags/asyncActions';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import * as requestAction from '../../store/reducers/requestReducer';
import {Status} from '../../api/api';
import {removeAllRequests, setActiveTub} from '../../store/reducers/requestReducer';
import * as validation from '../../utils/validation';

const Console = ({screenHeight}: {screenHeight: number}) => {
  const {newRequestText, data, isFetching, activeTab} = useAppSelector((state) => state.request);
  const {user} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [responseError, setResponseError] = React.useState<boolean>(false);
  const [requestError, setRequestError] = React.useState<boolean>(false);
  const [requestText, setRequestText] = React.useState<string>(newRequestText);
  const [responseText, setResponseText] = React.useState<string>('');

  React.useEffect(() => {
    dispatch(requestAction.initActions({userName: user.login}));
  }, [dispatch, user]);

  React.useEffect(() => {
    setRequestText(typeof newRequestText === 'string' ? newRequestText : JSON.stringify(newRequestText, null, 2));
    if (!activeTab && activeTab !== 0) return;

    const key = data?.dataList?.hasOwnProperty(activeTab) ? activeTab : '0';
    const status = data?.dataList[key]?.status === Status.ERROR;
    const requestStatus = data?.dataList[key]?.requestStatus === Status.ERROR;
    setResponseError(status);
    setRequestError(requestStatus);
    setResponseText(data?.dataList[key]?.response);
    setRequestText(newRequestText || data?.dataList[key]?.request);
  }, [newRequestText, responseError, data?.dataList, activeTab, data]);

  const formatJson = () => {
    try {
      const string = formatString(requestText);
      setRequestText(JSON.stringify(string, null, 2));
      setRequestError(false);
      dispatch(requestAction.setRequestError({activeId: `${activeTab}`, isError: Status.OK}));
      dispatch(requestAction.setRequestText({activeId: `${activeTab}`, text: JSON.stringify(string, null, 2)}));
    } catch (error) {
      dispatch(requestAction.setRequestError({activeId: `${activeTab}`, isError: Status.ERROR}));
    }
  };

  const formatString = (text: string) => {
    const newString = replaceString(text);
    return JSON.parse(newString);
  };

  const replaceString = (text: string) => {
    return text.replace(/\s+/g, ' ');
  };
  const validateJson = (text?: string) => {
    try {
      const formatText = formatString(text || requestText);
      return {isError: false, formatText};
    } catch (error) {
      return {isError: true, formatText: requestText || text || ''};
    }
  };

  const sendRequest = (id?: string) => {
    setResponseError(false);
    const isValid = validateJson();
    const activeId = id || `${activeTab}`;
    if (isValid.isError || requestError) {
      dispatch(requestAction.setRequestText({activeId, text: requestText}));
      dispatch(requestAction.setRequestError({activeId, isError: Status.ERROR}));
      return;
    }
    id
      ? dispatch(
          asyncUpdateRequestAction({
            data: data?.dataList[activeId]?.request,
            id: activeId,
          })
        )
      : dispatch(asyncRequestAction(isValid.formatText));
  };

  const onChangeRequestText = (text: string) => {
    setRequestText(text);
  };

  const removeAllTubs = () => {
    dispatch(removeAllRequests());
    setRequestText('');
    setRequestError(false);
    setResponseError(false);
    setResponseText('');
  };

  const setViewText = (requestText: string, responseText: string, id: number) => {
    dispatch(setActiveTub(id));
    setRequestError(false);
    setRequestText(requestText);
    setResponseText(responseText);
    dispatch(requestAction.setRequestText({text: requestText}));
  };

  const onBlurHandler = (requestText: string) => {
    setRequestText(requestText);
    dispatch(requestAction.setRequestText({text: requestText}));
    dispatch(requestAction.setActiveTub(null));
    const isValid = validation.validateJson(requestText);
    setRequestError(false);
    if (!isValid) {
      setRequestError(true);
      dispatch(requestAction.setRequestError({activeId: `${activeTab}`, isError: Status.ERROR}));
    } else {
      dispatch(requestAction.setRequestError({activeId: `${activeTab}`, isError: Status.OK}));
    }
  };

  return (
    <>
      <TabsBlock removeAllTubs={removeAllTubs} setViewText={setViewText} sendRequest={sendRequest} />
      <ConsoleFields
        onBlurHandler={onBlurHandler}
        requestError={requestError}
        responseError={responseError}
        requestText={requestText}
        responseText={responseText}
        onChangeValue={onChangeRequestText}
        fieldHeight={screenHeight - 170}
      />
      <ConsoleFooter isFetching={isFetching} error={requestError} sendRequest={sendRequest} formatJson={formatJson} />
    </>
  );
};

export default Console;
