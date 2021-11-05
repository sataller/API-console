import React from 'react';
import styled from 'styled-components';
import closeIcon from '../../assets/icons/cross.svg';

const CloseButton = () => {
  return (
    <Wrapper>
      <Gradient/>
      <Button>
        <img src={closeIcon} alt={'close button'}/>
      </Button>
    </Wrapper>
  );
};

export default CloseButton;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  right: 0;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100%;
  border-left: 1px solid #C4C4C4;;
  background: #F6F6F6;
  & img{
    max-width: 18px;
  }
`;

const Gradient = styled.div`
  width: 15px;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(269.93deg, #F6F6F6 0.06%, rgba(246, 246, 246, 0) 99.93%);
`;

