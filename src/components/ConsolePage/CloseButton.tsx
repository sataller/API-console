import React from 'react';
import styled from 'styled-components';
import closeIcon from '../../assets/icons/cross.svg';

const CloseButton = () => {
  return (
    <Wrapper>
      <Button>
        <img src={closeIcon} alt={'close button'} />
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
  -webkit-box-shadow: -4px 0 5px 0 rgba(165, 165, 165, 0.96);
  -moz-box-shadow: -4px 0 5px 0 rgba(165, 165, 165, 0.96);
  box-shadow: -4px 0 5px 0 rgba(165, 165, 165, 0.96);
  & img {
    max-width: 18px;
  }
`;
