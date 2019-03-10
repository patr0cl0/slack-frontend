import React from 'react';
import { graphql } from 'react-apollo';
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

const ViewTeam = ({ match: { params: { teamId, channelId } }, data: { loading, allTeams } }) => {
  if (loading) {
    return null;
  }

  const team = allTeams.find(t => t._id === teamId) || allTeams[0];
  const channel = channelId ? team.channels.find(c => c._id === channelId) : team.channels[0];

  return (
    <ViewTeamContainer>
      <Sidebar
        teamId={teamId}
        teams={allTeams}
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
