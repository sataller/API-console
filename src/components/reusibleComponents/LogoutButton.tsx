import React from 'react';
import styled from 'styled-components';

const LogoutButton = ({onLogoutClick, title}: {title: string; onLogoutClick: () => void}) => {
  return (
    <LogoutButtonWrapper onClick={onLogoutClick}>
      {title}
      <StyleSvg width="16" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id={'logout'} opacity="0.8">
          <path
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
            stroke="#0D0D0D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M16 17L21 12L16 7" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12H9" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </StyleSvg>
    </LogoutButtonWrapper>
  );
};

export default LogoutButton;

const StyleSvg = styled.svg`
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const LogoutButtonWrapper = styled.button`
  cursor: pointer;
  border: none;
  background-color: unset;
  margin-left: 35px;
  padding: 4px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;

  display: flex;
  align-items: center;

  color: #0d0d0d;

  &:active {
    color: #0055fb;
  }
  &:focus-visible {
    outline-color: #45a5ff;
  }
`;
