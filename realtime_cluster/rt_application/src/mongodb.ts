import { MongoClient } from 'mongodb';
import { Application } from './declarations';
import { getMongoConnection } from './modules/helpers/get-envs';


export default function (app: Application) {
  const connection = getMongoConnection();
  const database = connection.substr(connection.lastIndexOf('/') + 1);
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true })
    .then((client) => client.db(database));

  app.set('mongoClient', mongoClient);
}
