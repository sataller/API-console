import React from 'react';
import styled from 'styled-components';
import RequestField from './RequestField';
import dotsIcon from '../../assets/icons/dots.svg';
import {Resizable} from 're-resizable';

const ConsoleFields = ({height}: {height: number}) => {
  const [fieldWidth, setFieldWidth] = React.useState<number>(0);
  const [leftFieldWidth, setLeftFieldWidth] = React.useState<number>(fieldWidth);
  const [rightFieldWidth, setRightFieldWidth] = React.useState<number>(fieldWidth);
  const [width, setWidth] = React.useState(10);

  const resizeDots = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const resizeElement = resizeDots.current;
    const width: number = (window.innerWidth - 40) / 2;
    setFieldWidth(width);
    setLeftFieldWidth(width);
    setRightFieldWidth(width);
  }, []);

  return (
    <Wrapper height={height}>
        {/*<Resizable style={{backgroundColor: 'unset', display: 'flex', margin: 0, padding: 0, borderWidth: '5px'}}*/}
        {/*           onResizeStop={(e, direction, ref, d) => {*/}
        {/*             console.log(e, direction, ref, d);*/}
        {/*             if (direction === 'left') {*/}
        {/*               setLeftFieldWidth(leftFieldWidth - d.width);*/}
        {/*               setRightFieldWidth(rightFieldWidth + d.width);*/}
        {/*             }*/}

        {/*             if (direction === 'right') {*/}
        {/*               setLeftFieldWidth(leftFieldWidth + d.width);*/}
        {/*               setRightFieldWidth(rightFieldWidth - d.width);*/}
        {/*             }*/}
        {/*           }} size={{width: leftFieldWidth, height: '100%'}}>*/}
          <RequestField width={leftFieldWidth} />
      <ResizeIcon src={dotsIcon} />

        {/*</Resizable>*/}
        {/*<Resizable style={{backgroundColor: 'unset', display: 'flex', margin: 0, padding: 0, borderWidth: '5px'}}*/}
        {/*           onResizeStop={(e, direction, ref, d) => {*/}
        {/*             console.log(e, direction, ref, d);*/}
        {/*             if (direction === 'left') {*/}
        {/*               setLeftFieldWidth(leftFieldWidth - d.width);*/}
        {/*               setRightFieldWidth(rightFieldWidth + d.width);*/}
        {/*             }*/}

        {/*             if (direction === 'right') {*/}
        {/*               setLeftFieldWidth(leftFieldWidth + d.width);*/}
        {/*               setRightFieldWidth(rightFieldWidth - d.width);*/}
        {/*             }*/}
        {/*           }} size={{width: rightFieldWidth, height: '100%'}}>*/}
          {/*<ResizeIcon src={dotsIcon} />*/}
          <RequestField width={rightFieldWidth} />

        {/*</Resizable>*/}
      {/*<RequestField width={rightFieldWidth} />*/}
    </Wrapper>
  );
};

export default ConsoleFields;

const Wrapper = styled.div
  <
  {height: number} > `
        display: flex;
        width: 100%;
        min-height: ${props => props.height}px;
        padding: 30px 15px 15px 15px;
        `;

const ResizeIcon = styled.img`
  width: 10px;
  cursor: col-resize;
`;