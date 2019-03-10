import { withFormik } from 'formik';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form as FormContainer, Header, Input, Message, Modal } from 'semantic-ui-react';
import * as yup from 'yup';
import { formikPropTypes } from '../utils/commonProptypes';

const createChannelMutation = gql`
  mutation($name: String!, $teamId: ID!) {
    createChannel(name: $name, teamId: $teamId){
      name
      _id
    }
  }
`;

const AddChannelForm = ({
  handleChange,
  handleSubmit,
  touched,
  errors,
  isSubmitting,
  open,
  onClose,
}) => (
  <Modal open={open} onClose={onClose} style={{ padding: '4rem' }}>
    <Container text>
      <FormContainer onSubmit={handleSubmit} loading={isSubmitting}>
        <Header>Create channel</Header>

        <FormContainer.Field>
          <Input
            fluid
            error={Boolean(touched.name && errors.name)}
            name="name"
            placeholder={(touched.name && errors.name) ? errors.name : 'name'}
            onChange={handleChange}
          />
        </FormContainer.Field>

        <FormContainer.Field>
          <Button
            fluid
            loading={isSubmitting}
            type="submit"
          >
            Create!
          </Button>
        </FormContainer.Field>
      </FormContainer>

      {errors.length > 0 && (
        <Message
          error
          header="error"
          list={errors.map(err => err.message)}
        />
      )}
    </Container>
  </Modal>
);

AddChannelForm.propTypes = {
  ...formikPropTypes,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({
      name: '',
    }),
    validationSchema: yup.object({
      name: yup
        .string()
        .min(1, 'name has to be min 4 length')
        .max(24, 'name has to be max 24 length')
        .required('name required'),
    }),
    handleSubmit: async (values, { props: { history, mutate, teamId }, setSubmitting, setErrors }) => {
      try {
        const { data: { createChannel } } = await mutate({
          variables: { ...values, teamId },
        });

        if (createChannel.errors && createChannel.errors.length > 0) {
          setErrors(createChannel.errors);
          // return setStatus();
          return;
        }

        history.replace(`/view-team/${teamId}/${createChannel._id}`);
      } catch (error) {
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
  }),
)(AddChannelForm);
