import React from 'react';
import styled from 'styled-components';

const RequestField = ({width}:{width:number}) => {
  return (
    <Wrapper width={width}>
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