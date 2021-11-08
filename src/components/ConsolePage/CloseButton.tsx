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
  border-left: 1px solid #c4c4c4;
  background: #f6f6f6;
  -webkit-box-shadow: -30px 0 24px -2px rgba(255, 255, 255, 0.9);
  -moz-box-shadow: -30px 0 24px -2px rgba(255, 255, 255, 0.9);
  box-shadow: -30px 0 24px -2px rgba(255, 255, 255, 0.9);

  & img {
    max-width: 18px;
  }
`;
