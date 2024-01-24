const dotenv = require('dotenv');

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? './envs/production.env' : './envs/development.env',
});

const app = require("./app");

const mongoose = require('mongoose');
const {DB_URL} = process.env;
console.log(DB_URL)

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
    console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

