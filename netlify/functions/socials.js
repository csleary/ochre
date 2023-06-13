const axios = require('axios');
const querystring = require('querystring');
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } =
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
  const authUrl = 'https://api.twitter.com/oauth2/token';
  const key = TWITTER_CONSUMER_KEY;
  const secret = TWITTER_CONSUMER_SECRET;
  const token = await auth(authUrl, key, secret);
  const url = 'https://api.twitter.com/2/users/me?user.fields=public_metrics';
  const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  return res.data.public_metrics.followers_count;
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
