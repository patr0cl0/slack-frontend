import { withFormik } from 'formik';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';
import { createMessageMutation } from '../graphql/message';
import { formikPropTypes } from '../utils/commonProptypes';

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
      value={values.text}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </MessageInputWrapper>
);

MessageInput.propTypes = {
  ...formikPropTypes,
};

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({
      text: '',
    }),
    handleSubmit: async ({ text }, { setSubmitting, props, resetForm }) => {
      try {
        const { mutate } = props;
        if (!text || !text.trim()) {
          setSubmitting(false);
          return;
        }

        await mutate({ variables: { text, channelId: props.channelId } });
        resetForm({ text: '' });
      } catch (error) {
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
  }),
)(MessageInput);
