import gql from 'graphql-tag';

export const createChannelMutation = gql`
  mutation($name: String!, $teamId: ID!) {
    createChannel(name: $name, teamId: $teamId){
      ok
      errors {
        path
        message
      }
      channel {
        _id
        name
      }
    }
  }
`;
