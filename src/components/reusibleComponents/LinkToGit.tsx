import React from 'react';
import styled from 'styled-components';

const LinkToGit = ({children}: {children: string}) => {
  return <LinkToGitWrapper>{children}</LinkToGitWrapper>;
};

export default LinkToGit;

export const LinkToGitWrapper = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;

  display: flex;
  align-items: center;

  color: #999999;

  &:hover {
    color: orange;
    cursor: pointer;
  }

  &:focus {
    color: orange;
  }
`;
