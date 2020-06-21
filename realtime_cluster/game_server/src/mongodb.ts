import { MongoClient } from 'mongodb';
import { Application } from './declarations';

export default function (app: Application) {
  const connection = app.get('mongodb');
  const database = connection.substr(connection.lastIndexOf('/') + 1);
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true })
    .then(client => {
      app.service('clients').Model = client.db(database)
        .collection('clients');
      app.service('backends').Model = client.db(database)
        .collection('backends')
      app.service('client-inputs').Model = client.db(database)
        .collection('clients-inputs')
      app.service('backend-inputs').Model = client.db(database)
        .collection('backend-inputs')
    });

  app.set('mongoClient', mongoClient);
}
