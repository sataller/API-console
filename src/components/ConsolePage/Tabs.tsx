import React from 'react';
import Tab from './Tab';
import styled from 'styled-components';
import {Status, StatusType} from '../../api/api';
import {useScroll} from '../../hooks/useScroll';

export type TabsPropsType = {
  data?: {
    dataList: {
      [key: string]: {
        response: any;
        request: any;
        status: StatusType;
      };
    };
    maxLength: number;
  };
  setViewText: (requestText: string, responseText: string) => void;
  sendRequest: () => void;
  userName:string
};

const tabWidth = 140;
const closeButtonWidth = 50;

const Tabs = ({userName, sendRequest, data, setViewText}: TabsPropsType) => {
  const {scrollRef} = useScroll({data, tabWidth, closeButtonWidth});

  let tubsListE: JSX.Element[] = [];

  for (let key in data?.dataList) {
    const title = key==='20'? 'work tub' : data?.dataList[key]?.request?.action;
    tubsListE = [
      ...tubsListE,
      <Tab
        sendRequest={sendRequest}
        requestText={data?.dataList[key]?.request}
        responseText={data?.dataList[key]?.response}
        setViewText={setViewText}
        id={key}
        title={title}
        isError={data?.dataList[key]?.status === Status.ERROR}
        key={key}
        userName={userName}
      />,
    ];
  }

  return <TabsWrapper ref={scrollRef}>{tubsListE}</TabsWrapper>;
};

export default Tabs;

const TabsWrapper = styled.div`
  display: flex;
`;
