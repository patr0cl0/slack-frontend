import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import Messages from '../components/Messages';
import Sidebar from '../containers/Sidebar';
import { reactRouterPropTypes } from '../utils/commonProptypes';

const ViewTeamContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-width: 100vw;
  height: 100vh;
`;

const ViewTeam = ({ match: { params } }) => (
  <ViewTeamContainer>
    <Sidebar
      teamId={params.teamId}
    />
    <Header>Header</Header>
    <Messages>
      qwd
    </Messages>
    <MessageInput />
  </ViewTeamContainer>
);

ViewTeam.propTypes = {
  ...reactRouterPropTypes,
};

export default ViewTeam;
