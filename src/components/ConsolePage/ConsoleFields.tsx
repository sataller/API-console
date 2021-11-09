import React, {ChangeEvent} from 'react';
import styled from 'styled-components';
import dotsIcon from '../../assets/icons/dots.svg';
import RequestField from './RequestField';
import ResponseField from './ResponseField';
import {useResize} from '../../utils/useResize';

const json = {
  array: [1, 2, 3],
  boolean: true,
  null: null,
  number: 'four',
  object: {a: 'b', c: 'd'},
  string: 'Hello World',
};

const ConsoleFields = ({
  fieldHeight,
  value,
  onChangeValue,
  requestError,
}: {
  fieldHeight: number;
  value: string;
  requestError: boolean;
  onChangeValue: (text: string) => void;
}) => {
  const [responseError, setResponseError] = React.useState<boolean>(false);
  const {resizeDots, rightField, leftField} = useResize();

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeValue(e.target.value);
  };

  return (
    <Wrapper height={fieldHeight}>
      <FieldWrapper ref={leftField}>
        <Title error={requestError}>Request:</Title>
        <RequestField value={value} onchange={onChangeText} error={requestError} />
      </FieldWrapper>
      <div style={{display: 'flex'}} ref={resizeDots}>
        <ResizeIcon src={dotsIcon} />
      </div>
      <FieldWrapper ref={rightField}>
        <Title error={responseError}>Response:</Title>
        <ResponseField json={json} error={responseError} />
      </FieldWrapper>
    </Wrapper>
  );
};

export default ConsoleFields;

const FieldWrapper = styled.div`
  flex-grow: 0.5;
  min-width: 400px;
  align-items: stretch;
  overflow: auto;
`;

const Title = styled.h3<{error: boolean}>`
  height: 17px;

  font-family: SF Pro Text;
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
  padding: 0 15px 15px 15px;
`;

const ResizeIcon = styled.img`
  width: 10px;
  cursor: col-resize;
`;
