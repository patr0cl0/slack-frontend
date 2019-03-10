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

    inviteTeams {
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

export const addMemberMutation = gql`
  mutation($email: String!, $teamId: String!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        message
        path
      }
    }
  }
`;
