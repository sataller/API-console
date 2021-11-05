import React from 'react';
import styled from 'styled-components';
import {Button} from '../reusibleComponents/CustomButton';
import FormatButton from './FormatButton';

const ConsoleFooter = () => {
  return (
    <Wrapper>
      <Button>Send</Button>
      <LinkToGit>@link-to-your-github</LinkToGit>
      <FormatButton/>
    </Wrapper>
  );
};

export default ConsoleFooter;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background: #FFFFFF;
  margin: 0;
  padding: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

const LinkToGit = styled.div`
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


