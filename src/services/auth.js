





exports.logoutUser = async (req) => {
  const { res } = req; 
  if (!res) {
    throw new Error('Response object is not available');
  }
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
};
