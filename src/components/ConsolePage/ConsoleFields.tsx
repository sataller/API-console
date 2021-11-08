import React, {ChangeEvent} from 'react';
import styled from 'styled-components';
import dotsIcon from '../../assets/icons/dots.svg';
import RequestField from './RequestField';
import {useResizeDetector} from 'react-resize-detector';

const json = {
  array: [1, 2, 3],
  boolean: true,
  null: null,
  number: 'four',
  object: {a: 'b', c: 'd'},
  string: 'Hello World',
};

const ConsoleFields = ({
  fieldHeight,
  value,
  onChangeValue,
  requestError,
}: {
  fieldHeight: number;
  value: string;
  requestError: boolean;
  onChangeValue: (text: string) => void;
}) => {
  const [fieldWidth, setFieldWidth] = React.useState<number>(0);
  const [leftFieldWidth, setLeftFieldWidth] = React.useState<number>(fieldWidth);
  const [rightFieldWidth, setRightFieldWidth] = React.useState<number>(fieldWidth);
  const [responseError, setResponseError] = React.useState<boolean>(false);

  const resizeDots = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const resizeElement = resizeDots.current;
    const width: number = (window.innerWidth - 40) / 2;
    let mouseDown = false;
    let startPosition = resizeElement?.offsetLeft || 0;
    console.log(resizeDots);
    setFieldWidth(width);
    setLeftFieldWidth(width);
    setRightFieldWidth(width);
    console.log(width);

    if (resizeElement) {
      resizeElement.addEventListener('mouseup', (e) => {
        e.stopPropagation();
        e.preventDefault();
        mouseDown = false;
        console.log('remove test');
      });

      resizeElement.addEventListener('mousedown', (downEvent) => {
        downEvent.stopPropagation();
        downEvent.preventDefault();
        mouseDown = true;
        console.log('test');
      });

      document.addEventListener('mousemove', (moveEvent) => {
        moveEvent.stopPropagation();
        moveEvent.preventDefault();

        if (mouseDown) {
          resizeElement.style.transform = `translate(${moveEvent.clientX - startPosition}px)`;
          // setLeftFieldWidth((prevState) => prevState + (moveEvent.clientX - startPosition));
          // setRightFieldWidth((prevState) => prevState - (moveEvent.clientX - startPosition));
          const r = moveEvent.clientX - startPosition;
          console.log(r);
          // console.log(rightFieldWidth);
        }
      });
    }
    return () => {
      // resizeElement?.addEventListener('mousedown', (downEvent) => {
      //   downEvent.stopPropagation();
      //   downEvent.preventDefault();
      //
      //   document.addEventListener('mousemove', (moveEvent) => {
      //     console.log('moveEvent');
      //   });
      // });
      // resizeElement?.addEventListener('mouseup', (e) => {
      //   e.stopPropagation();
      //   e.preventDefault();
      //   console.log('remove moveEvent');
      //
      //   document.removeEventListener('mousemove', (moveEvent) => {
      //     console.log('moveEvent');
      //   });
      // });
    };
  }, [leftFieldWidth, rightFieldWidth]);

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeValue(e.target.value);
  };
  console.log('render');
  return (
    <Wrapper height={fieldHeight}>
      <FieldWrapper>
        <Title error={requestError}>Request:</Title>
        <RequestField value={value} onchange={onChangeText} width={leftFieldWidth} error={requestError} />
      </FieldWrapper>
      <div style={{display: 'flex', backgroundColor: 'red'}} ref={resizeDots}>
        <ResizeIcon src={dotsIcon} />
      </div>
      <FieldWrapper>
        <Title error={responseError}>Response:</Title>
        <ResponseField width={rightFieldWidth} error={responseError}>
          <div>
            <pre>
              <code>{JSON.stringify(json, null, 2)}</code>
            </pre>
          </div>
        </ResponseField>
      </FieldWrapper>
    </Wrapper>
  );
};

export default ConsoleFields;

const ResponseField = styled.div<{width: number; error?: boolean}>`
  width: ${(props) => props.width}px;
  resize: none;
  min-width: 400px;
  min-height: 95%;
  background: #ffffff;
  border: 1px solid ${(props) => (props.error ? '#CF2C00' : 'rgba(0, 0, 0, 0.2)')};
  border-radius: 5px;
  padding: 10px;
  ${(props) => props.error && 'box-shadow: 0px 0px 5px rgba(207, 44, 0, 0.5);'};
`;

const FieldWrapper = styled.div`
  min-width: 400px;
  //height: 95%;
`;

const Title = styled.h3<{error: boolean}>`
  height: 17px;

  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;

  display: flex;
  align-items: center;
  text-align: right;
  margin-bottom: 0;
  color: ${(props) => (props.error ? '#cf2c00' : '#999999')};
`;

const Wrapper = styled.div<{height: number}>`
  display: flex;
  width: 100%;

  min-height: ${(props) => props.height}px;
  padding: 0 15px 15px 15px;
`;

const ResizeIcon = styled.img`
  width: 10px;
  cursor: col-resize;
`;
