import React from 'react';
import Tab from './Tab';
import styled from 'styled-components';
import {Status} from '../../api/api';

export type TabsPropsType = {
  data?: {
    dataList: {
      [key: string]: {
        response: any;
        request: any;
        status: string;
      };
    };
    maxLength: number;
  };
  setViewText: (requestText: string, responseText: string) => void;
  sendRequest: () => Promise<void>;
};

const tabWidth = 140;
const closeButtonWidth = 50;

const Tabs = ({sendRequest, data, setViewText}: TabsPropsType) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  let tubsListE: JSX.Element[] = [];
  for (let key in data?.dataList) {
    tubsListE = [
      ...tubsListE,
      <Tab
        sendRequest={sendRequest}
        requestText={data?.dataList[key].request}
        responseText={data?.dataList[key].response}
        setViewText={setViewText}
        id={key}
        title={data?.dataList[key]?.request?.action}
        isError={data?.dataList[key].status === Status.ERROR}
        key={key}
      />,
    ];
  }

  React.useEffect(() => {
    const element = scrollRef.current;
    if (element && data) {
      const length = Object.entries(data?.dataList).length;
      let elementPosition = 0;
      element.addEventListener('wheel', (e) => {
        e.preventDefault();
        let visibleWidth = scrollRef?.current?.parentElement?.offsetWidth || 1;
        let tabsWidth = tabWidth * length - visibleWidth + closeButtonWidth;

        elementPosition = elementPosition + e.deltaY;

        if (tabWidth * length < visibleWidth + closeButtonWidth) {
          return;
        }
        if (elementPosition <= 1 && -tabsWidth <= elementPosition) {
          element.style.transform = `translateX(${elementPosition}px)`;
        } else if (-tabsWidth > elementPosition) {
          elementPosition = -tabsWidth;
          element.style.transform = `translateX(${elementPosition}px)`;
        } else {
          elementPosition = 0;
          element.style.transform = `translateX(${elementPosition}px)`;
        }
      });
    }
  }, [data]);

  return <TabsWrapper ref={scrollRef}>{tubsListE}</TabsWrapper>;
};

export default Tabs;

const TabsWrapper = styled.div`
  display: flex;
`;
