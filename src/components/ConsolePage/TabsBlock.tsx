import React from 'react';
import styled from 'styled-components';
import CloseButton from './CloseButton';
import Tabs from './Tabs';

const TabsBlock = () => {
  return (
      <Wrapper>
        <Tabs />
        <CloseButton />
      </Wrapper>
  );
};

export default TabsBlock;

const Wrapper = styled.div`
  display: flex;
  height: 50px;
  position: relative;
  align-items: center;
  background: #F6F6F6;
  margin: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
pointer-events: unset;
`;




