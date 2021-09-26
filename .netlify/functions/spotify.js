const axios = require('axios');
const querystring = require('querystring');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

const auth = async (url, key, secret) => {
  const data = { grant_type: 'client_credentials' };

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify(data),
    url,
    auth: {
      username: key,
      password: secret,
    },
  };

  const res = await axios(options);
  return res.data.access_token;
};

exports.handler = async (event, context) => {
  try {
    const authUrl = 'https://accounts.spotify.com/api/token';
    const key = SPOTIFY_CLIENT_ID;
    const secret = SPOTIFY_CLIENT_SECRET;
    const token = await auth(authUrl, key, secret);
    const url = 'https://api.spotify.com/v1/artists/0OmHDBh5styCXDWKwz58Ts';
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    const spotify = res.data.followers.total;

    return {
      statusCode: 200,
      body: JSON.stringify({ spotify }),
    };
  } catch (error) {
    console.log(error.toString());
    return { statusCode: 400 };
  }
};
