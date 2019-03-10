import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form as FormContainer, Header, Input, Message, Modal } from 'semantic-ui-react';
import * as yup from 'yup';
import { addMemberMutation } from '../graphql/team';
import { formikPropTypes } from '../utils/commonProptypes';

const InviteMemberModal = ({
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
        <Header>Add member to team</Header>

        <FormContainer.Field>
          <Input
            fluid
            autoFocus
            name="email"
            type="email"
            error={Boolean(touched.email && errors.email)}
            placeholder={(touched.email && errors.email) ? errors.email : 'email'}
            onChange={handleChange}
          />
        </FormContainer.Field>

        <FormContainer.Field>
          <Button
            fluid
            loading={isSubmitting}
            type="submit"
          >
            Invite!
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

InviteMemberModal.propTypes = {
  ...formikPropTypes,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  graphql(addMemberMutation),
  withFormik({
    mapPropsToValues: () => ({
      email: '',
    }),
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Must provide a valid email')
        .required('email required'),
    }),
    handleSubmit: async (values, {
      props: { mutate, teamId, onClose },
      setSubmitting,
      setErrors,
    }) => {
      try {
        const { data: response } = await mutate({
          variables: { ...values, teamId },
          // optimisticResponse: {
          //   addMemberMutation: {
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
          // update: (store, { data: { addMemberMutation } }) => {
          //   const { ok, channel } = addMemberMutation;

          //   if (!ok) {
          //     return;
          //   }

          //   const data = store.readQuery({ query: allTeamsMutation });
          //   const currentTeamIdx = data.allTeams.findIndex(team => team._id === teamId);
          //   data.allTeams[currentTeamIdx].channels.push(channel);
          //   store.writeQuery({ query: allTeamsMutation, data });
          // },
        });

        if (response.addTeamMember.errors && response.addTeamMember.errors.length > 0) {
          setErrors(response.addTeamMember.errors);
          // return setStatus();
          return;
        }

        // history.replace(`/view-team/${teamId}/${response.addMemberMutation.channel._id}`);
        onClose();
      } catch (error) {
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
  }),
)(InviteMemberModal);
