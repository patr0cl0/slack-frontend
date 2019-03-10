import { withFormik } from 'formik';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';
import { createMessageMutation } from '../graphql/message';

const MessageInputWrapper = styled.form`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
  & input {
    background-color: #E3E3E3;
  }
`;

const MessageInput = ({
  values,
  handleSubmit,
  handleChange,
  handleBlur,
  isSubmitting,
}) => (
  <MessageInputWrapper onSubmit={handleSubmit}>
    <Input
      fluid
      autoFocus
      name="text"
      loading={isSubmitting}
      value={values.message}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </MessageInputWrapper>
);

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({
      text: '',
    }),
    handleSubmit: async ({ text }, { setSubmitting, props, resetForm }) => {
      const { mutate } = props;
      if (!text || !text.trim()) {
        setSubmitting(false);
        return;
      }

      await mutate({ variables: { text, channelId: props.channelId } });

      resetForm();
    },
  }),
)(MessageInput);
