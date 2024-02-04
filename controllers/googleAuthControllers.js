const queryString = require("query-string");
const axios = require("axios")
const {googleAuthServer} = require('../db/services/googleAuthServices')


exports.googleAuth = async (req, res) => {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.BACKEND_URL}/api/user/google-redirect`,
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" "),
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });
    res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    );
  };
  

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BACKEND_URL}/api/user/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
      const token = await googleAuthServer(userData.data);
  
    return res.redirect(`${process.env.BASE_URL}?token=${token}`);
    // https://anastasiyank.github.io/water-tracker-frontend?token='token'
};
