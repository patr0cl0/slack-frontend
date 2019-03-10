import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TeamsContainer = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362133;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const baseTeamStyle = `
  margin-top: 1rem;
  border-radius: 7px;
  padding: 8px;
  width: 60px;
  height: 60px;
  background-color: #40373f;
  color: #766f75;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TeamLabelLink = styled(Link)`
  ${baseTeamStyle}
`;

const TeamLabel = ({ _id, name }) => <TeamLabelLink to={`/view-team/${_id}`}>{name}</TeamLabelLink>;

TeamLabel.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const TeamAdd = styled.div`
  ${baseTeamStyle}
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 60%;
    height: 12%;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, .2);
  }
  &:after {
    content: '';
    position: absolute;
    width: 12%;
    height: 60%;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, .2);
  }
`;

const Teams = ({ teams, onAddTeamClick }) => (
  <TeamsContainer>
    {teams.map(({ _id, name }) => <TeamLabel key={_id} _id={_id} name={name} />)}
    <TeamAdd
      onClick={onAddTeamClick}
    />
  </TeamsContainer>
);


Teams.propTypes = {
  onAddTeamClick: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default Teams;
