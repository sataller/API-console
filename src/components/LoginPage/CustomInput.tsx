import React from 'react';
import {Label, Input} from './LoginStyles';

type InputType = {
  error?: boolean
  id:string
  placeholder: string
}

const CustomInput = ({error, id, placeholder}: InputType) => {
  return (
    <>
      <Label error={error} htmlFor={id}>
      {' '}
        {placeholder}
    </Label>
      <Input error={error} id={id} type='text' placeholder={placeholder} />
    </>
  );
};

export default CustomInput;