import React from 'react';
import Tab from './Tab';
import styled from 'styled-components';

const tabWidth = 140;
const closeButtonWidth = 50;

const Tabs = () => {

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const data = [1,2,3,4,5,6,7,8,9,10];

  React.useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      let elementPosition = 0;
      element.addEventListener('wheel', (e) => {
        let visibleWidth = scrollRef?.current?.parentElement?.offsetWidth || 1;
        let tabsWidth = (tabWidth * data.length) - visibleWidth+closeButtonWidth;
        let deltaYleft = e.deltaY;
        elementPosition = elementPosition + deltaYleft;
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

  return (
    <TabsWrapper ref={scrollRef}>
      <Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab>
    </TabsWrapper>
  );
};

export default Tabs;

const TabsWrapper = styled.div`
  display: flex;
  //transform: translateX();

`;