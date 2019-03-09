import React from 'react';
import styled from 'styled-components';
import Channels from '../components/Channels';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import Messages from '../components/Messages';
import Teams from '../components/Teams';

const ViewTeamContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-width: 100vw;
  height: 100vh;
`;

export default () => (
  <ViewTeamContainer>
    <Teams>Teams</Teams>
    <Channels>Channels</Channels>
    <Header>Header</Header>
    <Messages>
      qwd
    </Messages>
    <MessageInput />
  </ViewTeamContainer>
);
