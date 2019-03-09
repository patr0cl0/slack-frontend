import PropTypes from 'prop-types';

export const reactRouterPropTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const formikPropTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  touched: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

export const httpErrorPropTypes = {
  httpErrors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
};
