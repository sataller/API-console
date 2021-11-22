import React from 'react';
import {useHistory} from 'react-router-dom';
import Console from '../ConsolePage/Console';
import History from '../HistoryPage/History';
import styled from 'styled-components';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import Header from '../Header/Header';

export enum PathName {
  console = '/console',
  history = '/history',
}

const MainPageWrapper = () => {
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [screenHeight, setScreenHeight] = React.useState(0);
  const fullScreeRef = React.useRef<HTMLDivElement>(null);

  const history = useHistory();
  const handle = useFullScreenHandle();

  React.useEffect(() => {
    if (handle.active) {
      setScreenHeight(window.screen.height);
    } else {
      setScreenHeight(window.innerHeight);
    }
  }, [handle.active]);

  const switchFullScreen = () => {
    if (handle.active) {
      handle.exit();
      setIsFullScreen(false);
    } else {
      handle.enter();
      setIsFullScreen(true);
    }
  };

  return (
    <FullScreen handle={handle}>
      <Wrapper height={screenHeight} ref={fullScreeRef}>
        <Header setIsFullScreen={switchFullScreen} isFullScreen={isFullScreen} />
        {history.location.pathname === PathName.console ? <Console screenHeight={screenHeight} /> : <History />}
      </Wrapper>
    </FullScreen>
  );
};

export default MainPageWrapper;

const Wrapper = styled.div<{height: number}>`
  max-width: 100%;
  min-height: ${(props) => props.height}px;
  background: #ffffff;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
