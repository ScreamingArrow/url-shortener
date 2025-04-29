import env from '@config/env';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const options: PostgresConnectionOptions = {
  type: 'postgres',
  host: env().database.host,
  port: env().database.port ? parseInt(env().database.port, 10) : 5432,
  username: env().database.username,
  password: env().database.password,
  database: env().database.database,
  synchronize: false,
  entities: [
    join(__dirname, '..', '..', 'shared', 'entities', '*.entity.{js,ts}'),
  ],
  migrations: [
    join(
      __dirname,
      '..',
      '..',
      'shared',
      'infra',
      'typeorm',
      'migrations',
      '*{.js,.ts}',
    ),
  ],
};

export const dataSource = new DataSource({ ...options });
