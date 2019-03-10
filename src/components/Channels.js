/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ChannelsContainer = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #52364e;
  padding-top: 1rem;
  .title {
    color: #a897a6;
    padding-left: .8rem;
    font-size: 16px;
    font-weight: bold;
  }

  & .header {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    &-title {
      padding-left: 1rem;
      font-size: 24px;
      color: white;
      font-weight: bold;
      margin-bottom: 8px;

    }
  }
  .channels {
    margin-bottom: 1rem;
  }
`;

const UserLabel = styled.div`
  color: #a897a6;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin: 2px 0;
  padding: 4px;
  padding-left: 1.4rem;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-right: 2rem;
  cursor: pointer;  
  &:hover {
    background-color: #4c9589;
    color: white;
    &:before {
      background-color: white;
    }
  }
  &:before {
    content: '';
    width: 12px;
    height: 12px;
    background-color: #38938c;
    margin-right: 4px;
    border-radius: 50%;
  }
`;

const ChannelLabel = styled.div`
  color: #a897a6;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  margin: 6px 0;
  cursor: pointer;  
  &:before {
    content: '#';
    margin-right: 4px;
  }
`;

const Channels = ({ username, channels, users, teamName }) => (
  <ChannelsContainer>
    <div className="header">
      <span className="header-title">
        {teamName}
      </span>
      <div>
        <UserLabel>
          {username}
        </UserLabel>
      </div>

    </div>

    <div className="channels">
      <span className="channels-title title">
        CHANNELS
      </span>
      {channels.map(({ name, _id }) => (
        <ChannelLabel key={_id}>{name}</ChannelLabel>
      ))}
    </div>

    <div className="direct-messages">
      <span className="direct-messages-title title">
        DIRECT MESSAGES
      </span>
      {users.map(({ name, _id }) => (
        <UserLabel key={_id}>{name}</UserLabel>
      ))}
    </div>
  </ChannelsContainer>
);

Channels.propTypes = {
  username: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.name,
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.name,
  })).isRequired,
};

export default Channels;