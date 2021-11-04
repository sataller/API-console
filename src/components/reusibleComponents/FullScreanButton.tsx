import React from 'react';
import styled from 'styled-components';
import {ConsoleHeaderPropsType} from '../ConsolePage/ConsoleHeader';


export const FullScreenButton = ({setIsFullScreen, isFullScreen}:ConsoleHeaderPropsType) => {
  return (
    <FullScreenButtonWrapper onClick={() => {
      setIsFullScreen(!isFullScreen)
    }}>
      <StyledSvg width='18' height='18' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='full-screen' stroke='#0D0D0D'>
          <path id='styled-element'
                d={isFullScreen
                  ? `M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 
                  18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893
                  18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579
                  18.4142C1.96086 18.7893 2.46957 19 3 19H6`
                  : `M1 6H4C4.53043 6 5.03914 5.78929 5.41421 5.41421C5.78929 5.03914 6 4.53043 6 4V1M14 1V4C14 
                  4.53043 14.2107 5.03914 14.5858 5.41421C14.9609 5.78929 15.4696 6 16 6H19M19 14H16C15.4696 14
                   14.9609 14.2107 14.5858 14.5858C14.2107 14.9609 14 15.4696 14 16V19M6 19V16C6 15.4696 5.78929 
                   14.9609 5.41421 14.5858C5.03914 14.2107 4.53043 14 4 14H1`}
                strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </g>
      </StyledSvg>
    </FullScreenButtonWrapper>
  );
};

const StyledSvg = styled.svg`


  &:hover {
    cursor: pointer
  }

  &:hover #full-screen {
    stroke: #0055FB;
  }

`;

const FullScreenButtonWrapper = styled.button`
  z-index: 1;
  margin: 0 30px;
  padding: 7px;
  cursor: pointer;
  border: none;
  background-color: unset;

  display: flex;
  align-items: center;

  color: #0D0D0D;

  &:active {
    color: #0055FB;
  }
`;