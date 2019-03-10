import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const createMessageMutation = gql`
  mutation($text: String!, $channelId: String!) {
    createMessage(text: $text, channelId: $channelId) {
      _id
    }
  }
`;
