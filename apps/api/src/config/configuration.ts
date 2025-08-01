export default () => ({
  port: process.env.PORT || 3000,
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/trust-network',
  },
  environment: process.env.NODE_ENV || 'development',
});
