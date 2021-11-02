import React from 'react';
import {Button} from './LoginStyles';
import loader from '../../assets/icons/loader.svg';

type ButtonType = {
  onSubmit:()=>void
  isFetching:boolean
  text:string
}

const CustomButton = ({onSubmit, isFetching, text}: ButtonType) => {
  return (
    <Button disabled={isFetching} type='submit' onClick={onSubmit}>
      {!isFetching && text}
      {isFetching && <img src={loader} alt={'loader'} />}
    </Button>
  );
};

export default CustomButton;