function getHeaders(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return headers;
}

module.exports = { getHeaders };
