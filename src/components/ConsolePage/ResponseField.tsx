import React from 'react';
import styled from 'styled-components';

const ResponseField = ({json, error}: {json: any; error: boolean}) => {
  return (
    <ResponseFieldWrapper error={error}>
      <div>
        <pre>
          <code>{JSON.stringify(json, null, 2)}</code>
        </pre>
      </div>
    </ResponseFieldWrapper>
  );
};

export default ResponseField;

const ResponseFieldWrapper = styled.div<{width?: number; error?: boolean}>`
  resize: none;
  min-width: 400px;
  min-height: 95%;
  background: #ffffff;
  border: 1px solid ${(props) => (props.error ? '#CF2C00' : 'rgba(0, 0, 0, 0.2)')};
  border-radius: 5px;
  padding: 10px;
  ${(props) => props.error && 'box-shadow: 0px 0px 5px rgba(207, 44, 0, 0.5);'};
`;
