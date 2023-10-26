import { Client } from 'pg';
import { env } from '../env';

export const client = new Client({
  database: env.DB_NAME,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
});

client
  .connect()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((e) => {
    console.error('Failed to connect to DB: ', e);
    process.exit(1);
  });
