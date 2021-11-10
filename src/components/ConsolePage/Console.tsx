import React from 'react';
import styled from 'styled-components';
import ConsoleHeader from './ConsoleHeader';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import TabsBlock from './TabsBlock';
import ConsoleFooter from './ConsoleFooter';
import ConsoleFields from './ConsoleFields';
import {asyncRequestAction} from '../../store/sags/asyncActions';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {initActions, setResponseError, setIsFetching, setRequestError} from '../../store/reducers/requestReducer';

const Console = () => {
  const {responseError, requestError, isFetching} = useAppSelector((state) => state.request);
  const dispatch = useAppDispatch();
  const fullScreeRef = React.useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [screenHeight, setScreenHeight] = React.useState(0);
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
    dispatch(initActions());
  }, [dispatch]);

  React.useEffect(() => {
    if (handle.active) {
      setScreenHeight(window.screen.height);
    } else {
      setScreenHeight(window.innerHeight);
    }
  }, [handle.active]);

  React.useEffect(() => {}, [responseError, requestError]);

  const formatJson = () => {
    try {
      const string = JSON.parse(requestText.replace(/\s+/g, ''));
      setRequestText(JSON.stringify(string, null, 2));
    } catch (error) {
      dispatch(setRequestError(true));
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(requestText.replace(/\s+/g, ''));
      return true;
    } catch (error) {
      return false;
    }
  };

  const sendRequest = async () => {
    dispatch(setResponseError(false));
    const isValid = validateJson();
    if (!isValid) {
      dispatch(setRequestError(true));
      return;
    }
    dispatch(setIsFetching(true));
    dispatch(asyncRequestAction(JSON.parse(requestText)));
    dispatch(setIsFetching(false));
  };

  const onChangeRequestText = (text: string) => {
    dispatch(setRequestError(false));
    setRequestText(text);
  };

  const setViewText = (requestText: string, responseText: string) => {
    setRequestText(requestText);
    setResponseText(responseText);
  };
  console.log(requestError);
  return (
    <FullScreen handle={handle}>
      <Wrapper height={screenHeight} ref={fullScreeRef}>
        <ConsoleHeader setIsFullScreen={switchFullScreen} isFullScreen={isFullScreen} />
        <TabsBlock setViewText={setViewText} sendRequest={sendRequest} />
        <ConsoleFields
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
