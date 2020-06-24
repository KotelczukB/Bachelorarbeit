import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { IConnectionData } from '../../Models/Interfaces/IClientForm';

export class Clients extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('clients');
    });
  }

  // create Methode, muss den vergebenen Channel mit speichern
};
