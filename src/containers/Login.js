import React, { useState } from 'react';
import { withFormik } from 'formik';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as yup from 'yup';

import {
  Form as FormContainer,
  Container,
  Button,
  Input,
  Header,
  Message,
} from 'semantic-ui-react';

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password){
      errors {
        message
        path
      }
      token
      refreshToken
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
      <Header>Login</Header>

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
        Login!
      </Button>
    </FormContainer>

    {httpErrors.length > 0 && (
      <Message
        error
        header="There was an error"
        list={httpErrors.map(err => err.message)}
      />
    )}
  </Container>
);

const Form = withFormik({
  mapPropsToValues: () => ({
    password: '',
    email: '',
  }),
  validationSchema: yup.object({
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


const Login = (props) => {
  const [httpErrors, setHttpErrors] = useState([]);
  const handleSubmit = async (data) => {
    const { data: { login } } = await props.mutate({
      variables: data,
    });

    if (login.errors && login.errors.length > 0) {
      return setHttpErrors(login.errors);
    }

    if (login.ok && !login.errors) {
      props.history.push('/home');
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      httpErrors={httpErrors}
    />
  );
};

export default graphql(loginMutation)(Login);
