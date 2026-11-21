// Waline comment server for https://aitanyan.com/ (deployed at https://comments.aitanyan.com/).
// Configuration lives in Vercel environment variables (see README.md); no secrets in this file.
const Application = require('@waline/vercel');

module.exports = Application({
  plugins: [],
});
