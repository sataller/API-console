import React from 'react';
import styled from 'styled-components';
import CloseButton from './CloseButton';
import Tabs from './Tabs';
import {useAppSelector} from '../../hooks/redux';

type TabsBlockType = {
  setViewText: (requestText: string, responseText: string) => void;
  sendRequest: () => void;
};

const TabsBlock = ({sendRequest, setViewText}: TabsBlockType) => {
  const {data} = useAppSelector((state) => state.request);

  return (
    <Wrapper>
      <Tabs sendRequest={sendRequest} setViewText={setViewText} data={data} />
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
  background: #f6f6f6;
  margin: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  pointer-events: unset;
`;
