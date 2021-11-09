import React from 'react';

export const useResize = () => {
  const resizeDots = React.useRef<HTMLImageElement>(null);
  const rightField = React.useRef<HTMLImageElement>(null);
  const leftField = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const resizeElement = resizeDots.current;
    const rightFieldE = rightField.current;
    const leftFieldE = leftField.current;
    let mouseDown = false;
    let startPosition = resizeElement?.offsetLeft || 0;
    let leftStartPosition = leftFieldE?.offsetWidth || 0;
    let rightStartPosition = rightFieldE?.offsetWidth || 0;

    if (!rightFieldE || !leftFieldE || !resizeElement) {
      return;
    }
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
      moveEvent.stopPropagation();
      moveEvent.preventDefault();

      if (mouseDown) {
        rightFieldE.style.width = `${rightStartPosition + (startPosition - moveEvent.clientX)}px`;
        leftFieldE.style.width = `${leftStartPosition - (startPosition - moveEvent.clientX)}px`;
      }
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
        moveEvent.stopPropagation();
        moveEvent.preventDefault();

        if (mouseDown) {
          rightFieldE.style.width = `${rightStartPosition + (startPosition - moveEvent.clientX)}px`;
          leftFieldE.style.width = `${leftStartPosition - (startPosition - moveEvent.clientX)}px`;
        }
      });
    };
  }, []);

  return {
    resizeDots,
    rightField,
    leftField,
  };
};
