import React from 'react';
import styled from 'styled-components';

type HistoryButtonTypes = {
  onClick: () => void;
  title: string;
};

const HistoryButton = ({title, onClick}: HistoryButtonTypes) => {
  return (
    <HistoryButtonWrapper onClick={onClick}>
      {title}
      <StyleSvg height="25" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h48v48h-48z" fill="none" />
        <path
          d="M25.99 6c-9.95 0-17.99 8.06-17.99 18h-6l7.79 7.79.14.29 8.07-8.08h-6c0-7.73 6.27-14 14-14s14 6.27 14 14-6.27 14-14 14c-3.87 0-7.36-1.58-9.89-4.11l-2.83 2.83c3.25 3.26 7.74 5.28 12.71 5.28 9.95 0 18.01-8.06 18.01-18s-8.06-18-18.01-18zm-1.99 10v10l8.56 5.08 1.44-2.43-7-4.15v-8.5h-3z"
          opacity=".9"
        />
      </StyleSvg>
    </HistoryButtonWrapper>
  );
};

export default HistoryButton;

const StyleSvg = styled.svg`
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const HistoryButtonWrapper = styled.button`
  cursor: pointer;
  border: none;
  background-color: unset;
  margin-right: 35px;
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
