import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import Channels from '../components/Channels';
import Teams from '../components/Teams';

const allTeamsMutation = gql`
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

const Sidebar = ({ data: { loading, allTeams }, teamId }) => {
  if (loading) {
    return null;
  }
  // grab the first team 'cause we dont have any logic to know in which team do we are
  const team = allTeams.find(t => t._id === teamId);

  return (
    <Fragment>
      <Teams
        teams={allTeams.map(t => ({
          _id: t._id,
          name: t.name.slice(0, 2),
        }))}
      />
      <Channels
        username="fernando"
        users={[{ _id: '1', name: 'javier' }, { _id: '2', name: 'Fernando' }]}
        channels={team.channels.map(c => ({ name: c.name, _id: c._id }))}
        teamName={team.name}
      />
    </Fragment>
  );
};

Sidebar.propTypes = {
  teamId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool,
    allTeams: PropTypes.any,
  }).isRequired,
};

export default graphql(allTeamsMutation)(Sidebar);
