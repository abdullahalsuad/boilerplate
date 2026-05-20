export default () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT ?? '8000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  cors: {
    origins: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  },
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  jwt: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
});
