const { BACKEND_URL } = process.env;
// FRONT_END;

const verifyEmailMessage = (email, user) => {
  return {
    to: email,
    subject: "Verify email",
    html: `  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        h2 {
            color: #3498db;
        }
        p {
            color: #555;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #3498db;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Email Confirmation</h2>
        <p>Thank you for registering. Please click the link below to confirm your email address:</p>
       <a target="_blank" href="${BACKEND_URL}/api/user/verify/${user.verificationToken}">Click to verify your e-mail</a>
    </div>
</body>
</html>
    
   `,
  };
};

const passwordResetMessage = (email) => {
  return {
    to: email,
    subject: "Password reset",
    html: `  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            background-color: #f0f8ff; 
            font-family: Arial, sans-serif;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
            border-radius: 5px; 
        }

        h2 {
            color: #1e90ff; 
        }

        p {
            color: #333; 
        }

        a {
            color: #1e90ff;
            text-decoration: none;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline; 
        }
    </style>
</head>
<body>

    <div class="container">

        <h2>Password Reset</h2>

        <p>You are receiving this email because you or someone else has requested to reset the password for your account.</p>

        <p>If this was you, click the link below to complete the password reset process:</p>

        <p><a target="_blank" href="http://localhost:3000/water-tracker-frontend/newpassword?email=${email}">Reset Password</a></p>

        <p>If you did not initiate this request, please ignore this email.</p>

        <p>Thank you!</p>

    </div>

</body>
</html>
    
   `,
  };
};

module.exports = {
  verifyEmailMessage,
  passwordResetMessage,
};
