import React from 'react';
import loader from '../../assets/icons/loader.svg';
import styled from 'styled-components';

type ButtonType = {
  onSubmit:()=>void
  isFetching:boolean
  text:string
  margin?:number
}

const CustomButton = ({onSubmit, isFetching, text, margin}: ButtonType) => {
  return (
    <Button margin={margin} disabled={isFetching} type='submit' onClick={onSubmit}>
      {!isFetching && text}
      {isFetching && <img src={loader} alt={'loader'} />}
    </Button>
  );
};

export default CustomButton;

export const Button = styled.button<{margin?:number}>`
  cursor: pointer;
  width: 120px;
  min-height: 40px;
  background: linear-gradient(180deg, #45a6ff 0%, #0055fb 100%), #c4c4c4;
  border-radius: 5px;
  margin-top: ${props => props.margin ? `${props.margin}px` : 0};
`;