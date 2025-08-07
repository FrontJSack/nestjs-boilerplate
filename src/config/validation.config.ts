import * as Joi from 'joi';

export const validationConfig = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  
  // Make these optional for now
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().port().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('password'),
  DB_NAME: Joi.string().default('nestjs_boilerplate'),
  
  JWT_ACCESS_SECRET: Joi.string().default('default-jwt-secret'),
  JWT_ACCESS_EXPIRATION: Joi.string().default('15m'),
});