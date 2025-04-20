export const logoutUser = async (res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
};
