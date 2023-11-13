const axios = require('axios');
const querystring = require('node:querystring');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, TWITTER_API_KEY, TWITTER_API_KEY_SECRET } =
  process.env;

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

const spotifyFollowers = async () => {
  const authUrl = 'https://accounts.spotify.com/api/token';
  const key = SPOTIFY_CLIENT_ID;
  const secret = SPOTIFY_CLIENT_SECRET;
  const token = await auth(authUrl, key, secret);
  const url = 'https://api.spotify.com/v1/artists/0OmHDBh5styCXDWKwz58Ts';
  const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  return res.data.followers.total;
};

const twitterFollowers = async () => {
  const tokenUrl = 'https://api.twitter.com/oauth2/token';
  const encodedKey = encodeURIComponent(TWITTER_API_KEY);
  const encodedSecret = encodeURIComponent(TWITTER_API_KEY_SECRET);
  const encodedCredentials = Buffer.from(`${encodedKey}:${encodedSecret}`).toString('base64');
  const headers = { Authorization: `Basic ${encodedCredentials}` };
  const params = { grant_type: 'client_credentials' };
  const options = { method: 'POST', headers, params, url: tokenUrl };
  const auth = await axios(options).catch(console.log);
  const token = auth.data.access_token;
  const url = 'https://api.twitter.com/2/users/18866956?user.fields=public_metrics';
  const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  return res.data.data.public_metrics.followers_count;
};

exports.handler = async (event, context) => {
  try {
    const [{ value: spotify }, { value: twitter }] = await Promise.allSettled([
      spotifyFollowers(),
      twitterFollowers(),
    ]);

    return { statusCode: 200, body: JSON.stringify({ spotify, twitter }) };
  } catch (error) {
    console.log(error.toString());
    return { statusCode: 400 };
  }
};
