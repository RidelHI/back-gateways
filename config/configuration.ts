export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3001,
  },
  database: {
    name: process.env.DATABASE_NAME || 'gwbd',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  },
});
