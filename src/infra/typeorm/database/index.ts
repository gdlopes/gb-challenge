import { createConnection, Connection } from 'typeorm';

const connection = async (): Promise<Connection> => {
  return createConnection();
};

export default connection;