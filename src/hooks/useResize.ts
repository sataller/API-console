import React from 'react';

export const useResize = () => {
  const resizeDots = React.useRef<HTMLImageElement>(null);
  const rightField = React.useRef<HTMLDivElement>(null);
  const leftField = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const rightFieldE = rightField.current;
    const leftFieldE = leftField.current;

    const lWidth = localStorage.getItem('leftFieldWidth');
    const rWidth = localStorage.getItem('rightFieldWidth');

    if (!rightFieldE || !leftFieldE || lWidth || rWidth) return;
    rightFieldE.style.width = `${leftFieldE.clientWidth}`;
    leftFieldE.style.width = `${rightFieldE.clientWidth}`;
    localStorage.setItem('leftFieldWidth', `${leftFieldE.clientWidth}`);
    localStorage.setItem('rightFieldWidth', `${rightFieldE.clientWidth}`);
  }, []);

  React.useEffect(() => {
    const resizeElement = resizeDots.current;
    const rightFieldE = rightField.current;
    const leftFieldE = leftField.current;

    if (!rightFieldE || !leftFieldE || !resizeElement) {
      return;
    }
    let mouseDown = false;
    let rightWidth = localStorage.getItem('rightFieldWidth');
    let leftWidth = localStorage.getItem('leftFieldWidth');
    if (rightWidth && leftWidth) {
      rightFieldE.style.width = rightWidth;
      leftFieldE.style.width = leftWidth;
    }
    let startPosition = resizeElement?.offsetLeft || 0;
    let leftStartPosition = leftFieldE?.offsetWidth || 0;
    let rightStartPosition = rightFieldE?.offsetWidth || 0;

    resizeElement.addEventListener('mouseup', (e) => {
      e.stopPropagation();
      e.preventDefault();
      mouseDown = false;
    });

    resizeElement.addEventListener('mousedown', (downEvent) => {
      downEvent.stopPropagation();
      downEvent.preventDefault();
      mouseDown = true;
    });

    document.addEventListener('mousemove', (moveEvent) => {
      mouseMoveListener(moveEvent, rightFieldE, leftFieldE, rightStartPosition, leftStartPosition, startPosition, mouseDown);
    });

    return () => {
      resizeElement.removeEventListener('mouseup', (e) => {
        e.stopPropagation();
        e.preventDefault();
        mouseDown = false;
      });

      resizeElement.removeEventListener('mousedown', (downEvent) => {
        downEvent.stopPropagation();
        downEvent.preventDefault();
        mouseDown = true;
      });

      document.removeEventListener('mousemove', (moveEvent) => {
        mouseMoveListener(moveEvent, rightFieldE, leftFieldE, rightStartPosition, leftStartPosition, startPosition, mouseDown);
      });
    };
  }, []);

  return {
    resizeDots,
    rightField,
    leftField,
  };
};

const mouseMoveListener = (
  moveEvent: MouseEvent,
  rightFieldE: HTMLDivElement,
  leftFieldE: HTMLDivElement,
  rightStartPosition: number,
  leftStartPosition: number,
  startPosition: number,
  mouseDown: boolean
) => {
  moveEvent.stopPropagation();
  moveEvent.preventDefault();

  if (mouseDown) {
    rightFieldE.style.width = `${rightStartPosition + (startPosition - moveEvent.clientX)}px`;
    leftFieldE.style.width = `${leftStartPosition - (startPosition - moveEvent.clientX)}px`;
    localStorage.setItem('leftFieldWidth', leftFieldE.style.width);
    localStorage.setItem('rightFieldWidth', rightFieldE.style.width);
  }
};
