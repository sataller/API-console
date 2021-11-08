import React from 'react';
import styled from 'styled-components';

const FormatButton = ({onClick}: {onClick: () => void}) => {
  return (
    <FormatButtonWrapper onClick={onClick}>
      <FormatIcon width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id={'format-icon'} opacity="0.8" stroke="#0D0D0D">
          <path d="M21 10H7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 6H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 14H7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 18H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </FormatIcon>
      Форматировать
    </FormatButtonWrapper>
  );
};

export default FormatButton;

const FormatIcon = styled.svg`
  margin-right: 10px;
`;

const FormatButtonWrapper = styled.button`
  display: flex;
  background-color: unset;
  cursor: pointer;
  align-items: center;
  width: 166px;
  height: 32px;
  border: none;

  &:hover {
    color: #0055fb;
  }

  &:hover #format-icon {
    stroke: #0055fb;
  }
`;
