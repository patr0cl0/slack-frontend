import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form as FormContainer, Header, Input, Message, Modal } from 'semantic-ui-react';
import * as yup from 'yup';
import { allTeamsMutation, createTeamMutation } from '../graphql/team';
import { formikPropTypes } from '../utils/commonProptypes';

const AddTeamForm = ({
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
        <Header>Create Team</Header>

        <FormContainer.Field>
          <Input
            fluid
            autoFocus
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

AddTeamForm.propTypes = {
  ...formikPropTypes,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  graphql(createTeamMutation),
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
    handleSubmit: async (values, {
      props: { history, mutate, onClose },
      setSubmitting,
      setErrors,
    }) => {
      try {
        const { data: response } = await mutate({
          variables: values,
          // optimisticResponse: {
          //   createTeam: {
          //     __typename: 'Mutation',
          //     ok: true,
          //     channel: {
          //       __typename: 'Channel',
          //       name: values.name,
          //       _id: '-1',
          //     },
          //     errors: null,
          //   },
          // },
          update: (store, { data: { createTeam } }) => {
            const { ok, team } = createTeam;

            if (!ok) {
              return;
            }

            const data = store.readQuery({ query: allTeamsMutation });
            data.allTeams.push(team);
            store.writeQuery({ query: allTeamsMutation, data });
          },
        });

        if (response.createTeam.errors && response.createTeam.errors.length > 0) {
          setErrors(response.createTeam.errors);
          // return setStatus();
          return;
        }

        history.replace(`/view-team/${response.createTeam.team._id}`);
        onClose();
      } catch (error) {
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
  }),
)(AddTeamForm);
