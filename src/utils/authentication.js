export const getJWTPayload = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {};
  }
  const base64Url = token.split('.')[1];

  return JSON.parse(window.atob(base64Url));
};

export const hasValidAuthentication = () => {
  try {
    const token = localStorage.getItem('token');
    const base64Url = token.split('.')[1];
  
    JSON.parse(window.atob(base64Url));
  } catch (err) {
    return false;
  }

  return true;
};
