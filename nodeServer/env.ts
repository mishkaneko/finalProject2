import { config } from 'dotenv';
import populateEnv from 'populate-env';

config();

export let env = {
  JWT_SECRET: '',
  DB_NAME: '',
  DB_USERNAME: '',
  DB_PASSWORD: '',
  //   DB_HOST: "localhost",
  //   DB_PORT: 5432,

  NODE_ENV: 'development',
  STRIPE_API_KEY: '',
  STRIPE_PUBLISHABLE_KEY: '',
  ORIGIN: '',
};

populateEnv(env, { mode: 'halt' });
