import { MongoClient, ServerApiVersion } from 'mongodb';

import { getMongoAtlasUri } from '@common/utils/envConfig';
import { logger } from '@src/server';

const uri = getMongoAtlasUri();

const client = new MongoClient(uri, {
  serverApi: {
    strict: true,
    deprecationErrors: true,
    version: ServerApiVersion.v1,
  },
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error(`Error connecting to MongoDB: ${(err as Error).message}`);
    throw err;
  }
};

connectToDatabase();

export const database = client.db();
