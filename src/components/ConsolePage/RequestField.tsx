import React, {ChangeEvent} from 'react';
import styled from 'styled-components';

type RequestFieldPropsType = {
  width: number;
  children?: React.ReactNode;
  error?: boolean;
  onchange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
};

const RequestField = ({width, children, error, onchange, value}: RequestFieldPropsType) => {
  // const fieldRef = React.useRef<HTMLDivElement>(null);
  const fieldRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <Wrapper onChange={(e) => onchange(e)} ref={fieldRef} width={width} error={error} value={value}>
      {children}
    </Wrapper>
  );
};

export default RequestField;

const Wrapper = styled.textarea<{width: number; error?: boolean}>`
  width: ${(props) => props.width}px;
  resize: none;
  min-width: 400px;
  min-height: 95%;
  background: #ffffff;
  border: 1px solid ${(props) => (props.error ? '#CF2C00' : 'rgba(0, 0, 0, 0.2)')};
  border-radius: 5px;
  padding: 10px;
  ${(props) => props.error && 'box-shadow: 0px 0px 5px rgba(207, 44, 0, 0.5);'}
`;
