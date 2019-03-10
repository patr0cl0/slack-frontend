import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import MessageInput from '../components/MessageInput';
import Messages from '../components/Messages';
// import PropTypes from 'prop-types';

const messagesQuery = gql`
  query($channelId: String!) {
    messages(channelId: $channelId) {
      _id
      text
      createdAt
      user {
        username
      }
    }
  }
`;

const MessagesContainer = ({ channel }) => (
  <Query query={messagesQuery} variables={{ channelId: channel._id }}>
    {({ data: { messages } }) => [
      <Messages
        key="messages"
        messages={messages}
      />,

      <MessageInput
        key="messages-input"
        channelId={channel._id}
      />,
    ]}
  </Query>
);

MessagesContainer.propTypes = {
  channel: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default MessagesContainer;
