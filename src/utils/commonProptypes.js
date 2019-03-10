import PropTypes from 'prop-types';

export const reactRouterPropTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
};

export const formikPropTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.any.isRequired,
  touched: PropTypes.any.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export const httpErrorPropTypes = {
  httpErrors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
};
