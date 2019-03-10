import PropTypes from 'prop-types';
import React from 'react';
import { Comment } from 'semantic-ui-react';
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

const Messages = ({ messages = [] }) => (
  <MessagesContainer>
    <Comment.Group>
      {messages.map(m => (
        <Comment key={m._id}>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
          <Comment.Content>
            <Comment.Author as="a">{m.user.username}</Comment.Author>
            <Comment.Metadata>
              <div>{m.createdAt}</div>
            </Comment.Metadata>
            <Comment.Text>{m.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  </MessagesContainer>
);

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    _id: PropTypes.string,
    user: PropTypes.any,
  })),
};

Messages.defaultProps = {
  messages: [],
};

export default Messages;
