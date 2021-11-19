import React from 'react';
import styled from 'styled-components';
import ConsoleHeader from './ConsoleHeader';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import TabsBlock from './TabsBlock';
import ConsoleFooter from './ConsoleFooter';
import ConsoleFields from './ConsoleFields';
import {asyncRequestAction, asyncUpdateRequestAction} from '../../store/sags/asyncActions';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import * as requestAction from '../../store/reducers/requestReducer';
import {Status} from '../../api/api';
import {setActiveTub} from '../../store/reducers/requestReducer';
import * as validation from '../../utils/validation';

const Console = () => {
  const {newRequestText, data, isFetching, activeTab} = useAppSelector((state) => state.request);
  const {user} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const fullScreeRef = React.useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [screenHeight, setScreenHeight] = React.useState(0);
  const [responseError, setResponseError] = React.useState<boolean>(false);
  const [requestError, setRequestError] = React.useState<boolean>(false);
  const [requestText, setRequestText] = React.useState<string>(newRequestText);
  const [responseText, setResponseText] = React.useState<string>('');
  const handle = useFullScreenHandle();

  const switchFullScreen = () => {
    if (handle.active) {
      handle.exit();
      setIsFullScreen(false);
    } else {
      handle.enter();
      setIsFullScreen(true);
    }
  };

  React.useEffect(() => {
    dispatch(requestAction.initActions({userName: user.login}));
  }, [dispatch, user]);

  React.useEffect(() => {
    if (handle.active) {
      setScreenHeight(window.screen.height);
    } else {
      setScreenHeight(window.innerHeight);
    }
  }, [handle.active]);

  React.useEffect(() => {
    setRequestText(newRequestText);

    if (!activeTab) return;

    const key = data?.dataList?.hasOwnProperty(activeTab) ? activeTab : '0';
    const status = data?.dataList[key]?.status === Status.ERROR;
    const requestStatus = data?.dataList[key]?.requestStatus === Status.ERROR;
    setResponseError(status);
    setRequestError(requestStatus);
    setResponseText(data?.dataList[key]?.response);
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
    debugger;
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

  const setViewText = (requestText: string, responseText: string, id: number) => {
    dispatch(setActiveTub(id));
    setRequestError(false);
    setRequestText(requestText);
    setResponseText(responseText);
    dispatch(requestAction.setRequestText({text: requestText}));
  };

  const onBlurHandler = (requestText: string) => {
    console.log(requestText);
    const isValid = validation.validateJson(requestText);
    setRequestError(false);
    if (!isValid) {
      setRequestError(true);
      dispatch(requestAction.setRequestError({activeId: `${activeTab}`, isError: Status.ERROR}));
    } else {
      dispatch(requestAction.setRequestError({activeId: `${activeTab}`, isError: Status.OK}));
    }
    setRequestText(requestText);
    dispatch(requestAction.setRequestText({text: requestText}));
  };

  return (
    <FullScreen handle={handle}>
      <Wrapper height={screenHeight} ref={fullScreeRef}>
        <ConsoleHeader setIsFullScreen={switchFullScreen} isFullScreen={isFullScreen} />
        <TabsBlock setViewText={setViewText} sendRequest={sendRequest} />
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
      </Wrapper>
    </FullScreen>
  );
};

export default Console;

const Wrapper = styled.div<{height: number}>`
  max-width: 100%;
  min-height: ${(props) => props.height}px;
  background: #ffffff;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
