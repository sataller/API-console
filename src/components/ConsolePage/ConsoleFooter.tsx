import React from 'react';
import styled from 'styled-components';
import CustomButton from '../reusibleComponents/CustomButton';
import FormatButton from './FormatButton';
import {Constants} from '../../constants';
import LinkToGit from '../reusibleComponents/LinkToGit';

type FooterPropsType = {
  formatJson: () => void;
  sendRequest: (id: string) => void;
  error: boolean;
  isFetching: boolean;
};

const ConsoleFooter = ({formatJson, sendRequest, error, isFetching}: FooterPropsType) => {
  return (
    <Wrapper>
      <CustomButton isFetching={isFetching} text={Constants.Send} isError={error} onSubmit={() => sendRequest(``)} />
      <LinkToGit>@link-to-your-github</LinkToGit>
      <FormatButton title={Constants.Format} onClick={formatJson} />
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
