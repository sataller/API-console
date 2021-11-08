import React, {ChangeEvent} from 'react';
import styled from 'styled-components';
import ConsoleHeader from './ConsoleHeader';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import TabsBlock from './TabsBlock';
import ConsoleFooter from './ConsoleFooter';
import ConsoleFields from './ConsoleFields';

const json = `{"array": [1,2,3],"boolean":true,"null": null,"number":"four","object":{"a":"b","c": "d"},"string":"HelloWorld"}`;

const Console = () => {
  const fullScreeRef = React.useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [screenHeight, setScreenHeight] = React.useState(0);
  const [requestError, setRequestError] = React.useState<boolean>(false);
  const [requestText, setRequestText] = React.useState<string>(json);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
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
    if (handle.active) {
      setScreenHeight(window.screen.height);
    } else {
      setScreenHeight(window.innerHeight);
    }
  }, [handle.active]);

  const formatJson = () => {
    try {
      const string = JSON.parse(requestText.replace(/\s+/g, ''));
      setRequestText(JSON.stringify(string, null, 2));
    } catch (error) {
      setRequestError(true);
      console.log(error);
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

  const sendRequest = () => {
    const isValid = validateJson();
    if (!isValid) {
      setRequestError(true);
    }
    setIsFetching(true);
    setTimeout(() => setIsFetching(false), 3000);
  };

  const onChangeRequestText = (text: string) => {
    setRequestError(false);
    setRequestText(text);
  };

  return (
    <FullScreen handle={handle}>
      <Wrapper height={screenHeight} ref={fullScreeRef}>
        <ConsoleHeader setIsFullScreen={switchFullScreen} isFullScreen={isFullScreen} />
        <TabsBlock />
        <ConsoleFields
          requestError={requestError}
          value={requestText}
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
