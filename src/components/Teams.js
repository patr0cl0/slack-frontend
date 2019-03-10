import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TeamsContainer = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362133;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  /* padding-top: 1rem; */
  /* padding: 1rem; */
  .team {
    margin-top: 1rem;
    border-radius: 7px;
    padding: 8px;
    width: 60px;
    height: 50px;
    background-color: #40373f;
    color: #766f75;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const Teams = ({ teams }) => (
  <TeamsContainer>
    {teams.map(({ _id, name }) => (
      <Link to={`/view-team/${_id}`} key={_id} className="team">
        {name}
      </Link>
    ))}
  </TeamsContainer>
);


Teams.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default Teams;
