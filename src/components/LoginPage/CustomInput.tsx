import React from 'react';
import {Label, Input} from './LoginStyles';

type InputType = {
  error?: string;
  id: string;
  placeholder: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
};

const CustomInput = ({error, id, placeholder, onChange, value, type}: InputType) => {
  return (
    <>
      <Label error={Boolean(error)} htmlFor={id}>
        {' '}
        {error || placeholder}
      </Label>
      <Input onChange={onChange} value={value} error={Boolean(error)} id={id} type={type} placeholder={placeholder} />
    </>
  );
};

export default CustomInput;
