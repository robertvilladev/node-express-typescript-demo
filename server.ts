import { getPort } from './src/common/utils/envConfig';
import { app, logger } from './src/server';

const port = getPort();

const server = app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

const onCloseSignal = () => {
  logger.info('sigint received, shutting down');
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });

  setTimeout(() => process.exit(1), 10000).unref();
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);

export default server;
