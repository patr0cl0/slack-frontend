import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const allUsersQuery = gql`
  {
    allUsers {
      _id
      username
    }
  }
`;

const Home = ({ data: { allUsers = [] } }) => allUsers.map(user => (
  <h1 key={user._id}>
    {user._id}
    /
    {user.username}
  </h1>
));

export default graphql(allUsersQuery)(Home);
