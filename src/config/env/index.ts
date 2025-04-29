import 'dotenv/config';
export default () => {
  return {
    application: {
      port: process.env.PORT || 3000,
      stage: process.env.STAGE || 'development',
      randomBytesSize: parseInt(process.env.RANDOM_BYTES_SIZE, 10) || 32
    },
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'secret',
      expiresIn: process.env.JWT_EXPIRES_IN || '3m',
    },
  };
};
