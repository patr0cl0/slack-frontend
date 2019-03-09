import React from 'react';
import { Input } from 'semantic-ui-react';
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
    <Input fluid {...props} />
  </MessageInputContainer>
);

export default MessageInput;
