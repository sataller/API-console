import React from 'react';
import styled from 'styled-components';
import ConsoleHeader from './ConsoleHeader';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import TabsBlock from './TabsBlock';
import ConsoleFooter from './ConsoleFooter';
import ConsoleFields from './ConsoleFields';

const Console = () => {
  const fullScreeRef = React.useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [screenHeight, setScreenHeight] = React.useState(0);

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

  return (
    <FullScreen handle={handle}>
      <Wrapper height={screenHeight} ref={fullScreeRef}>
        <ConsoleHeader setIsFullScreen={switchFullScreen} isFullScreen={isFullScreen} />
        <TabsBlock />
        <ConsoleFields height={screenHeight - 170} />
        <ConsoleFooter />
      </Wrapper>
    </FullScreen>
  );
};

export default Console;

const Wrapper = styled.div<{height: number}>`
  max-width: 100%;
  min-height: ${props => props.height}px;
  background: #FFFFFF;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
