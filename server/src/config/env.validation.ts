import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(8000),
  DATABASE_URL: Joi.string().required(),
  ALLOWED_ORIGINS: Joi.string().default('*'),
  API_PREFIX: Joi.string().default('api/v1'),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRATION: Joi.string().default('15m'),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),
});
