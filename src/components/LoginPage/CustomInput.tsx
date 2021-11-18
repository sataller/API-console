import React from 'react';
import {Label, Input} from './LoginStyles';
import styled from 'styled-components';
import {Constants} from '../../constants';

type InputType = {
  error?: string;
  id: string;
  placeholder: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  touched?: boolean;
};

const CustomInput = ({touched, onBlur, error, id, placeholder, onChange, value, type}: InputType) => {
  console.log(touched, error, id);
  return (
    <>
      <Label error={Boolean(error && touched)} htmlFor={id}>
        {' '}
        {(touched && error) || (
          <>
            {placeholder}
            {touched === undefined && <Optional>{Constants.Optional}</Optional>}
          </>
        )}
      </Label>
      <Input
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        error={Boolean(error && touched)}
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default CustomInput;

const Optional = styled.div`
  float: right;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #999999;
`;
