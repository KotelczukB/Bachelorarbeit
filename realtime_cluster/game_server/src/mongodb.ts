import { MongoClient } from 'mongodb';
import { Application } from './declarations';

export default function (app: Application) {
  const connection = app.get('mongodb');
  const database = connection.substr(connection.lastIndexOf('/') + 1);
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true })
    .then(client => {
      app.service('router-connector').Model = client.db(database)
        .collection('router-data');
    });

  app.set('mongoClient', mongoClient);
}