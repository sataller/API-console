import React from 'react';
import styled from 'styled-components';
import CloseButton from './CloseButton';
import Tabs from './Tabs';

type TabsBlockType = {
  setViewText: (requestText: string, responseText: string) => void;
  sendRequest: () => Promise<void>;
};

const TabsBlock = ({sendRequest, setViewText}: TabsBlockType) => {
  const [userRequests, setUserRequests] = React.useState();
  React.useEffect(() => {
    const data = localStorage.getItem('userActions');
    if (data) {
      setUserRequests(JSON.parse(data));
    }
  }, []);

  return (
    <Wrapper>
      <Tabs sendRequest={sendRequest} setViewText={setViewText} data={userRequests} />
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
