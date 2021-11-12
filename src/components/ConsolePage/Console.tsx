import React from 'react';
import styled from 'styled-components';
import ConsoleHeader from './ConsoleHeader';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import TabsBlock from './TabsBlock';
import ConsoleFooter from './ConsoleFooter';
import ConsoleFields from './ConsoleFields';
import {asyncRequestAction, asyncUpdateRequestAction} from '../../store/sags/asyncActions';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
// import {initActions, setRequestError} from '../../store/reducers/requestReducer';
import * as requestAction from '../../store/reducers/requestReducer';
import {Status} from '../../api/api';
import {changeRequestText} from '../../store/reducers/requestReducer';

const Console = () => {
  const {requestError, data, isFetching, activeTab} = useAppSelector((state) => state.request);
  const {user} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const fullScreeRef = React.useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [screenHeight, setScreenHeight] = React.useState(0);
  const [responseError, setResponseError] = React.useState<boolean>(false);
  const [requestText, setRequestText] = React.useState<string>('');
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
    const key = data?.dataList?.hasOwnProperty(activeTab) ? activeTab : '20';
    const status = data?.dataList[key]?.status === Status.ERROR;
    setResponseError(status);
    setResponseText(data?.dataList[key]?.response);
    setRequestText(JSON.stringify(data?.dataList[key]?.request));
  }, [responseError, requestError, data?.dataList, activeTab, data]);

  const formatJson = () => {
    try {
      const string = formatString(requestText);
      setRequestText(JSON.stringify(string, null, 2));
    } catch (error) {
      dispatch(requestAction.setRequestError(true));
    }
  };

  const formatString = (text: string) => {
    return JSON.parse(text.replace(/\s+/g, ' '));
  };

  const validateJson = (text?: string) => {
    try {
      const formatText = formatString(text || requestText);
      return {isError: false, formatText};
    } catch (error) {
      return {isError: true, formatText: requestText || ''};
    }
  };

  const sendRequest = (id?: string) => {
    setResponseError(false);
    const isValid = validateJson();
    if (isValid.isError) {
      dispatch(requestAction.setRequestError(true));
      return;
    }

    const activeId = id || `${activeTab}`;
    debugger;
    activeId !== `20`
      ? dispatch(
          asyncUpdateRequestAction({
            data: data.dataList[activeId].request,
            id: activeId,
          })
        )
      : dispatch(asyncRequestAction(isValid.formatText));
  };

  const onChangeRequestText = (text: string) => {
    dispatch(requestAction.setRequestError(false));
    setRequestText(text);
  };

  const onBlur = (text: string) => {
    const newText = formatString(text);
    dispatch(changeRequestText({id: `${activeTab}`, newText}));
  };

  const setViewText = (requestText: string, responseText: string) => {
    setRequestText(requestText);
    setResponseText(responseText);
  };

  return (
    <FullScreen handle={handle}>
      <Wrapper height={screenHeight} ref={fullScreeRef}>
        <ConsoleHeader setIsFullScreen={switchFullScreen} isFullScreen={isFullScreen} />
        <TabsBlock setViewText={setViewText} sendRequest={sendRequest} />
        <ConsoleFields
          onBlur={onBlur}
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
