const options = {
  httpOnly: true,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
};

export const setUpSession = (res, session) => {
  res.cookie('sessionId', session._id, options);
  res.cookie('refreshToken', session.refreshToken, options);
};
