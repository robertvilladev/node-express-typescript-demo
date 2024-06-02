import { MongoClient, ServerApiVersion } from 'mongodb';

/* import { getMongoAtlasUri } from '@common/utils/envConfig'; */
import { logger } from '@src/server';

const uri =
  'mongodb+srv://robertvilladev:30x3EuPvXrEpxByi@database.vjpjaep.mongodb.net/?retryWrites=true&w=majority&appName=database';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    strict: true,
    deprecationErrors: true,
    version: ServerApiVersion.v1,
  },
});

const connectToDatabase = async () => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error(`Error connecting to MongoDB: ${(err as Error).message}`);
    throw err; // Re-throw the error after logging it
  }
};

connectToDatabase();

export const database = client.db();
