/* eslint-disable no-process-env */
const { createServer } = require("./app");

createServer({
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    PORT: process.env.PORT,
  }
});
