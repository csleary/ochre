const axios = require('axios');
const querystring = require('querystring');
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env;

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
    const authUrl = 'https://api.twitter.com/oauth2/token';
    const key = TWITTER_CONSUMER_KEY;
    const secret = TWITTER_CONSUMER_SECRET;
    const token = await auth(authUrl, key, secret);
    const url = 'https://api.twitter.com/1.1/users/show.json?screen_name=ochremusic';
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    const twitter = res.data.followers_count;

    return {
      statusCode: 200,
      body: JSON.stringify({ twitter }),
    };
  } catch (error) {
    console.log(error.toString());
    return { statusCode: 400 };
  }
};
