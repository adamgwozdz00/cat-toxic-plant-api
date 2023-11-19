import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: ['dist/**/plant{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: false,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

export const databaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const source = await initializeConnection();
    await runMigrations(source);
    return source;
  },
};

const initializeConnection = async (iterationNumber: number = 1) => {
  const maxIterations = 3;

  if (maxIterations === iterationNumber) {
    return undefined;
  }

  await wait(iterationNumber * 3000);

  try {
    const source = await connectionSource.initialize();
    console.log(`Successfully initialize connection.`);
    return source;
  } catch (err) {
    console.log(
      `Attempt" ${iterationNumber}. Unable to initialize connection with error:\n${err}`,
    );
    await initializeConnection(iterationNumber + 1);
  }
};

const runMigrations = async (
  source: DataSource,
  iterationNumber: number = 1,
) => {
  const maxIterations = 3;

  if (maxIterations === iterationNumber) {
    return undefined;
  }

  await wait(iterationNumber * 3000);

  try {
    await source.runMigrations({ transaction: 'each' });
  } catch (err) {
    console.log(
      `Attempt" ${iterationNumber}.Failed migration with error:\n${err}`,
    );
    await runMigrations(source, iterationNumber + 1);
  }
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
