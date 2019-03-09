import React from 'react';
import styled from 'styled-components';

const MessageInputContainer = styled.div`
  grid-column: 3;
  grid-row: 3;

  & input {
    background-color: #E3E3E3;
  }
`;

const MessageInput = props => (
  <MessageInputContainer>
    <input {...props} />
  </MessageInputContainer>
);

export default MessageInput;
