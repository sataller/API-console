import React from 'react';
import styled from 'styled-components';
import ConsoleHeader from './ConsoleHeader';
import {exitFullScreen, requestFullScreen} from '../../utils/reuquestFullScreen';
import TabsBlock from './TabsBlock';
import ConsoleFooter from './ConsoleFooter';
import ConsoleFields from './ConsoleFields';

const Console = () => {
  const fullScreeRef = React.useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [screenHeight, setScreenHeight] = React.useState(0);

  React.useEffect(() => {
    setScreenHeight(window.innerHeight);
    // if (fullScreeRef.current && isFullScreen) {
    //   requestFullScreen(fullScreeRef.current)?.then(data => console.log(data)).catch(error=>console.log(error))
    // }
    // if(!isFullScreen){
    //   exitFullScreen();
    // }
  }, [isFullScreen]);

  return (
    <Wrapper height={screenHeight} ref={fullScreeRef}>
      <ConsoleHeader setIsFullScreen={setIsFullScreen} isFullScreen={isFullScreen}/>
      <TabsBlock/>
      <ConsoleFields height={screenHeight-170}/>
      <ConsoleFooter/>
    </Wrapper>
  );
};

export default Console;

const Wrapper = styled.div<{height:number}>`
  max-width: 100%;
  min-height: ${props => props.height}px;
  //background: #693535;
  background: #FFFFFF;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
