import { withFormik } from 'formik';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { Button, Container, Form as FormContainer, Header, Input, Message } from 'semantic-ui-react';
import * as yup from 'yup';
import { formikPropTypes, httpErrorPropTypes, reactRouterPropTypes } from '../utils/commonProptypes';

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name){
      team {
        _id
      }
      errors {
        message
        path
      }
      ok
    }
  }
`;

const InnerForm = ({
  handleChange,
  handleSubmit,
  touched,
  errors,
  httpErrors,
  isSubmitting,
}) => (
  <Container text>
    <FormContainer onSubmit={handleSubmit} loading={isSubmitting}>
      <Header>Create Team</Header>

      <Input
        fluid
        error={Boolean(touched.name && errors.name)}
        name="name"
        placeholder={(touched.name && errors.name) ? errors.name : 'name'}
        onChange={handleChange}
      />

      <Button
        type="submit"
      >
        Create!
      </Button>
    </FormContainer>

    {httpErrors.length > 0 && (
      <Message
        error
        header="error"
        list={httpErrors.map(err => err.message)}
      />
    )}
  </Container>
);

InnerForm.propTypes = {
  ...formikPropTypes,
  ...httpErrorPropTypes,
};

const Form = withFormik({
  mapPropsToValues: () => ({
    name: '',
  }),
  validationSchema: yup.object({
    name: yup
      .string()
      .min(4, 'name has to be min 4 length')
      .max(24, 'name has to be max 24 length')
      .required('name required'),
  }),
  handleSubmit: async (values, { props, setSubmitting }) => {
    try {
      await props.onSubmit(values);
    } catch (error) {
      throw error;
    } finally {
      setSubmitting(false);
    }
  },
})(InnerForm);


const CreateTeam = (props) => {
  const [httpErrors, setHttpErrors] = useState([]);
  const onSubmit = async (data) => {
    const { data: { createTeam } } = await props.mutate({
      variables: data,
    });

    if (createTeam.errors && createTeam.errors.length > 0) {
      return setHttpErrors(createTeam.errors);
    }

    return props.history.push(`/view-team/${createTeam.team._id}`);
  };

  return (
    <Form
      onSubmit={onSubmit}
      httpErrors={httpErrors}
    />
  );
};

CreateTeam.propTypes = {
  ...reactRouterPropTypes,
  mutate: PropTypes.func.isRequired,
};

export default graphql(createTeamMutation)(CreateTeam);
