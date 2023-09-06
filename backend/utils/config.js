const {
  PORT = 3000,
  JWT_SECRET = 'secret-phrase',
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
};
