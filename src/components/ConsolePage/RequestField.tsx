import React, {ChangeEvent} from 'react';
import styled from 'styled-components';

type RequestFieldPropsType = {
  children?: React.ReactNode;
  error?: boolean;
  onchange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  onBlurHandler: (text: string) => void;
};

const RequestField = ({onBlurHandler, children, error, onchange, value}: RequestFieldPropsType) => {
  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    onBlurHandler(e.target.value);
  };
  return (
    <Wrapper onBlur={(e) => onBlur(e)} onChange={(e) => onchange(e)} error={error} value={value}>
      {children}
    </Wrapper>
  );
};

export default RequestField;

const Wrapper = styled.textarea<{width?: number; error?: boolean}>`
  width: 100%;
  min-width: 400px;
  resize: none;
  min-height: 95%;
  background: #ffffff;
  border: 1px solid ${(props) => (props.error ? '#CF2C00' : 'rgba(0, 0, 0, 0.2)')};
  border-radius: 5px;
  padding: 10px;
  ${(props) => props.error && 'box-shadow: 0px 0px 5px rgba(207, 44, 0, 0.5);'}
`;
