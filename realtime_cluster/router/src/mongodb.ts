import { MongoClient } from 'mongodb';
import { Application } from './declarations';

export default function (app: Application) {
  const connection = app.get('mongodb');
  const database = connection.substr(connection.lastIndexOf('/') + 1);
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true })
    .then(client => {
      client.db(database);
      // init collections
      app.service('users').Model = client.db(database)
        .collection('users');
      app.service('applications').Model = client.db(database)
        .collection('applications');
      app.service('game-apps').Model = client.db(database)
        .collection('game-apps');
    });

  app.set('mongoClient', mongoClient);
}
