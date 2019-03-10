import { withFormik } from 'formik';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form as FormContainer, Header, Input, Message } from 'semantic-ui-react';
import * as yup from 'yup';
import { createTeamMutation } from '../graphql/team';
import { formikPropTypes } from '../utils/commonProptypes';

const InnerForm = ({
  handleChange,
  handleSubmit,
  touched,
  errors,
  isSubmitting,
}) => (
  <Container text>
    <FormContainer onSubmit={handleSubmit} loading={isSubmitting}>
      <Header>Create Team</Header>

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
);

InnerForm.propTypes = {
  ...formikPropTypes,
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
    handleSubmit: async (values, { props: { history, mutate }, setSubmitting, setErrors }) => {
      try {
        const { data: { createTeam } } = await mutate({
          variables: values,
        });

        if (createTeam.errors && createTeam.errors.length > 0) {
          setErrors(createTeam.errors);
          // return setStatus();
          return;
        }

        history.replace(`/view-team/${createTeam.team._id}`);
      } catch (error) {
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
  }),
)(InnerForm);
