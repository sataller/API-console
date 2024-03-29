import React, {ChangeEvent} from 'react';
import styled from 'styled-components';
import dotsIcon from '../../assets/icons/dots.svg';
import RequestField from './RequestField';
import ResponseField from './ResponseField';
import {useResize} from '../../hooks/useResize';
import {Constants} from '../../constants';

const ConsoleFields = ({
  fieldHeight,
  requestText,
  onChangeValue,
  requestError,
  responseError,
  responseText,
                         onBlurHandler
}: {
  fieldHeight: number;
  requestText: string;
  responseText: string;
  requestError: boolean;
  responseError: boolean;
  onChangeValue: (text: string) => void;
  onBlurHandler: (text: string) => void;
}) => {
  const {resizeDots, rightField, leftField} = useResize();

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeValue(e.target.value);
  };
  return (
    <Wrapper height={fieldHeight}>
      <FieldWrapper maxHeight={fieldHeight * 0.95} ref={leftField}>
        <Title error={requestError}>{Constants.Request}:</Title>
        <RequestField onBlurHandler={onBlurHandler} value={requestText} onchange={onChangeText} error={requestError} />
      </FieldWrapper>
      <div style={{display: 'flex'}} ref={resizeDots}>
        <ResizeIcon src={dotsIcon} />
      </div>
      <FieldWrapper maxHeight={fieldHeight * 0.95} ref={rightField}>
        <Title error={responseError}>{Constants.Response}:</Title>
        <ResponseField json={responseText} error={responseError} />
      </FieldWrapper>
    </Wrapper>
  );
};

export default ConsoleFields;

const FieldWrapper = styled.div<{maxHeight?: number}>`
  flex-grow: 0.5;
  min-width: 400px;
  max-height: ${(props) => props.maxHeight}px;
  align-items: stretch;
`;

const Title = styled.h3<{error: boolean}>`
  height: 17px;

  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;

  display: flex;
  align-items: center;
  text-align: right;
  margin-bottom: 0;
  color: ${(props) => (props.error ? '#cf2c00' : '#999999')};
`;

const Wrapper = styled.div<{height: number}>`
  display: flex;
  width: 100%;

  min-height: ${(props) => props.height}px;
  padding: 0 15px;
`;

const ResizeIcon = styled.img`
  width: 10px;
  cursor: col-resize;
`;
