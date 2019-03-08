import React, { useState } from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import {
  Form as FormContainer,
  Container,
  Button,
  Input,
  Header,
  Message,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password){
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
  isSubmitting
}) => (
  <Container text>
    <FormContainer onSubmit={handleSubmit} loading={isSubmitting}>
      <Header>Register</Header>

      <Input
        fluid
        error={Boolean(touched.username && errors.username)}
        name="username"
        placeholder={(touched.username && errors.username) ? errors.username : 'Username'}
        onChange={handleChange}
      />

      <Input
        fluid
        error={Boolean(touched.email && errors.email)}
        name="email"
        type="email"
        placeholder={(touched.email && errors.email) ? errors.email : 'Email'}
        onChange={handleChange}
      />

      <Input
        fluid
        error={Boolean(touched.password && errors.password)}
        name="password"
        type="password"
        placeholder={(touched.password && errors.password) ? errors.password : 'Password'}
        onChange={handleChange}
      />

      <Button
        type="submit"
      >
        Submit
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

const Form = withFormik({
  mapPropsToValues: () => ({
    username: '',
    password: '',
    email: '',
  }),
  validationSchema: yup.object({
    username: yup
      .string()
      .min(1, 'username has to be min 4 length')
      .max(24, 'username has to be max 24 length')
      .required('username is required'),
    email: yup
      .string()
      .email('email has to be valid')
      .required('email is required'),
    password: yup
      .string()
      .min(6, 'password has to be min 6 length')
      .max(24, 'password has to be max 24 length')
      .required('password required'),
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


const Registration = (props) => {
  const [httpErrors, setHttpErrors] = useState([]);
  const onSubmit = async (data) => {
    const { data: { register } } = await props.mutate({
      variables: data,
    });

    if (register.errors && register.errors.length > 0) {
      return setHttpErrors(register.errors);
    }

    if (register.ok && !register.errors) {
      props.history.push('/home');
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      httpErrors={httpErrors}
    />
  );
};

export default graphql(registerMutation)(Registration);
