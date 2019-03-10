import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'semantic-ui-react';
import CreateTeam from '../routes/CreateTeam';

const AddChannelModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose} style={{ padding: '4rem' }}>
    <CreateTeam />
  </Modal>
);

AddChannelModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddChannelModal;
