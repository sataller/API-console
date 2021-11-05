import React from 'react';
import styled from 'styled-components';
import JSONEditor from 'jsoneditor';

const RequestField = ({width}:{width:number}) => {
  const fieldRef = React.useRef<HTMLDivElement>(null)

  const element = fieldRef.current;

  // if(element){
  //   const options = {}
  //   const editor = new JSONEditor(element, options)
  //
  //   // set json
  //   const initialJson = {
  //     "Array": [1, 2, 3],
  //     "Boolean": true,
  //     "Null": null,
  //     "Number": 123,
  //     "Object": {"a": "b", "c": "d"},
  //     "String": "Hello World"
  //   }
  //   editor.set(initialJson)
  //
  //   // get json
  //   const updatedJson = editor.get()
  // }

  return (
    <Wrapper ref={fieldRef} width={width}>
    </Wrapper>
  );
};

export default RequestField;

const Wrapper = styled.div<{width:number}>`
  width: ${props =>props.width}px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

