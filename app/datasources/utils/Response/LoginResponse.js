function LoginResponse(isSuccess, message, token, user) {
  return {
    isSuccess,
    message,
    token,
    user,
  };
}

module.exports = LoginResponse;
