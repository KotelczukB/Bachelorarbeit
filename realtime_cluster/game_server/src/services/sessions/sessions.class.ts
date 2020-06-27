import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import ISession from '../../models/Interfaces/session/ISession';
import ISessionCreate from '../../models/Interfaces/session/ISessionCreate';

export class Sessions extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('sessions');
    });
  }
  public async create(data: ISessionCreate, params: any): Promise<any> {
    const session: ISession = {
      createdAt: new Date(),
      session_name: data.name,
      backends_channel: `backend_${name}`,
      clients_channel: `clinet_${name}`,
      started: false,
      activ: true,
      clients: [data.client_id],
      backend: [data.backendURL],
      syncPing: 0
    }
    return super.create(session, params)
  } 
};
