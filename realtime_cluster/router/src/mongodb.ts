import { MongoClient } from 'mongodb';
import { Application } from './declarations';

export default function (app: Application) {
  const connection = getMongoConnection();
  const database = connection.substr(connection.lastIndexOf('/') + 1);
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true })
  .then((client) => client.db(database));


  app.set('mongoClient', mongoClient);
}


export const getMongoConnection = (): string => {
  if (process.env.MONGO) {
    return process.env.MONGO;
  } else {
    throw new Error('critical ENV Variable not provided')
  }
};
