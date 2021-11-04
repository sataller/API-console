import React from 'react';
import styled from 'styled-components';
import ConsoleHeader from './ConsoleHeader';
import {exitFullScreen, requestFullScreen} from '../../utils/reuquestFullScreen';
import TabsBlock from './TabsBlock';

const Console = () => {
  const fullScreeRef = React.useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  //
  // React.useEffect(() => {
  //   if (fullScreeRef.current && isFullScreen) {
  //     requestFullScreen(fullScreeRef.current)?.then(data => console.log(data)).catch(error=>console.log(error))
  //   }
  //   if(!isFullScreen){
  //     exitFullScreen();
  //   }
  // }, [isFullScreen]);

  return (
    <Wrapper ref={fullScreeRef}>
      <ConsoleHeader setIsFullScreen={setIsFullScreen} isFullScreen={isFullScreen}/>
      <TabsBlock/>
    </Wrapper>
  );
};

export default Console;

const Wrapper = styled.div`
  max-width: 100%;
  min-height: 870px;
  background: #693535;
  margin: 0;
  padding: 0;
`;
