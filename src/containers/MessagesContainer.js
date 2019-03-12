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
        _id
        username
      }
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription($channelId: String!) {
    newChannelMessage(channelId: $channelId) {
      _id
      text
      createdAt
      user {
        _id
        username
      }
    }
  }
`;

const MessagesContainer = ({ channel }) => ([
  <Query
    key="messages-query"
    fetchPolicy="network-only"
    query={messagesQuery}
    variables={{ channelId: channel._id }}
  >
    {({ data: { messages = [] }, subscribeToMore }) => (
      <Messages
        key="messages"
        messages={messages}
        subscribeToNewMessages={() => subscribeToMore({
          document: NEW_MESSAGE,
          variables: { channelId: channel._id },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newMessage = subscriptionData.data.newChannelMessage;

            if (prev.messages[prev.messages.length - 1]._id === newMessage._id) {
              return prev;
            }

            return {
              ...prev,
              messages: [...prev.messages, newMessage],
            };
          },
        })}
      />
    )}
  </Query>,

  <MessageInput
    key="messages-input"
    channelId={channel._id}
  />,
]);

MessagesContainer.propTypes = {
  channel: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default MessagesContainer;
