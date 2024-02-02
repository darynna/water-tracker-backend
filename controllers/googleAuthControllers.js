const queryString = require("querystring")
const axios = require("axios")
const URL = require("url");
const {googleAuthServer} = require('../db/services/googleAuthServices')


exports.googleAuth = async (req, res) => {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `http://localhost:5001/api/auth/google-redirect`,
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
  
//   ${process.env.BACKEND_URL}

exports.goodleRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = queryString.parse(urlObj.search);
    const code = urlParams.code;
  
    const tokenData = await axios({
      url: "https://oauth2.googleapis.com/token",
      method: "post",
      data: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `http://localhost:5001/api/auth/google-redirect`,
        grant_type: "authorization_code",
        code,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  
    const userData = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`,
      },
    });
    console.log(userData.data)
    const token = await googleAuthServer(userData.data);
  
    return res.redirect(`${process.env.BASE_URL}?token=${token}`);
  };