import gql from 'graphql-tag';

export const allTeamsMutation = gql`
  {
    allTeams {
      _id
      name
      channels {
        _id
        name
      }
    }
  }
`;

export const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name){
      team {
        _id
        name
        channels {
          _id
          name
        }
      }
      errors {
        message
        path
      }
      ok
    }
  }
`;
