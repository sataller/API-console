import React from 'react';
import {Label, Input} from './LoginStyles';

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
  return (
    <>
      <Label error={Boolean(error && touched)} htmlFor={id}>
        {' '}
        {touched && (error || placeholder)}
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
