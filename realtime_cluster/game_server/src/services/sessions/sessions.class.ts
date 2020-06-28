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
      backends_channel: `backend_${data.name}`,
      clients_channel: `clinet_${data.name}`,
      started: false,
      clientsToStart: 0,
      closed: false,
      activ: data.backendURL !== undefined,
      clients: [data.client_id],
      backend: [data.backendURL],
      syncPing: 0
    }
    return super.create(session, params)
  } 

  // **************************************************************
  // create & patch triggern post-verify-session-progress
  // update triggert es nicht, update ist dafur gedacht falls "silent" changes vorgenommen werden mussen
  // **************************************************************
};
