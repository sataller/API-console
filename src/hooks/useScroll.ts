import React from 'react';

export const useScroll = ({data, tabWidth, closeButtonWidth}: {data: any; tabWidth: number; closeButtonWidth: number}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = scrollRef.current;
    if (element && data.dataList) {
      const length = Object.entries(data?.dataList)?.length;
      let elementPosition = 0;
      element.addEventListener('wheel', (e) => {
        e.preventDefault();
        let visibleWidth = scrollRef?.current?.parentElement?.offsetWidth || 1;
        let tabsWidth = tabWidth * length - visibleWidth + closeButtonWidth;

        elementPosition = elementPosition + e.deltaY;

        if (tabWidth * length < visibleWidth - 30) {
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
  }, [closeButtonWidth, data, tabWidth]);

  return {
    scrollRef,
  };
};
