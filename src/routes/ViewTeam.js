import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import Messages from '../components/Messages';
import Sidebar from '../containers/Sidebar';
import { allTeamsMutation } from '../graphql/team';
import { reactRouterPropTypes } from '../utils/commonProptypes';

const ViewTeamContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-width: 100vw;
  height: 100vh;
`;

const ViewTeam = ({ data, match }) => {
  const { teamId, channelId } = match.params;
  const { loading, allTeams, inviteTeams } = data;

  if (loading) {
    return null;
  }

  const teams = [...allTeams, ...inviteTeams];

  if (!teams.length) {
    return (<Redirect to="/create-team" />);
  }

  const team = teamId ? teams.find(t => t._id === teamId) : teams[0];

  if (!team && teamId) {
    return (<Redirect to="/view-team" />);
  }

  const channel = channelId ? team.channels.find(c => c._id === channelId) : team.channels[0];

  if (!channel && channelId) {
    return (<Redirect to={`/view-team/${teamId}`} />);
  }

  return (
    <ViewTeamContainer>
      <Sidebar
        teamId={teamId}
        teams={teams}
        currentTeam={team}
        currentChannel={channel}
      />

      <Header>{channel.name}</Header>

      <Messages>
        qwd
      </Messages>

      <MessageInput />
    </ViewTeamContainer>
  );
};

ViewTeam.propTypes = {
  ...reactRouterPropTypes,
};

export default graphql(allTeamsMutation)(ViewTeam);
