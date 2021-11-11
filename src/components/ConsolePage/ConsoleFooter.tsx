import React from 'react';
import styled from 'styled-components';
import CustomButton from '../reusibleComponents/CustomButton';
import FormatButton from './FormatButton';

type FooterPropsType = {
  formatJson: () => void;
  sendRequest: (id: string) => void;
  error: boolean;
  isFetching: boolean;
};

const ConsoleFooter = ({formatJson, sendRequest, error, isFetching}: FooterPropsType) => {
  return (
    <Wrapper>
      <CustomButton isFetching={isFetching} text={'Send'} isError={error} onSubmit={() => sendRequest(``)} />
      <LinkToGit>@link-to-your-github</LinkToGit>
      <FormatButton onClick={formatJson} />
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
  background: #ffffff;
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
