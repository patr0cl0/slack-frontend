import React from 'react';
import styled from 'styled-components';

const MessagesContainer = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding: 16px;
  ul {
    list-style: none;
    padding-left: 0;
  }

  .message:nth-child(odd){
    background-color: #F2F2F2;
    text-align: right;
  }
`;

const Messages = (props) => (
  <MessagesContainer>
    <ul>
      <li className='message'>asdas</li>
      <li className='message'>asdas</li>
      <li className='message'>asdasasd</li>
      <li className='message'>asdasasd</li>
      <li className='message'>asdasasdasd</li>
    </ul>
  </MessagesContainer>
);

export default Messages;
