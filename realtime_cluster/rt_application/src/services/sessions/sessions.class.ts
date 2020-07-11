import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import ISession from '../../models/Interfaces/session/ISession';
import ISessionCreate from '../../models/Interfaces/session/ISessionCreate';
import { SessionState } from '../../models/enums/SessionState';
import getTimeStamp from '../../modules/helpers/getTimeStamp';

export class Sessions extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('sessions');
    });
  }
  public async create(data: ISessionCreate): Promise<any> {
    const session: ISession = {
      createdAt: new Date(),
      session_name: data.name,
      backends_channel: `backend_${data.name}`,
      clients_channel: `clinet_${data.name}`,
      min_clients: data.client_min,
      max_clients: data.client_max,
      interval_value: data.interval,
      state: SessionState.active,
      clients: [data.client_id],
      backend: [data.backend_url],
      syncPing: 0,
      newest_update: getTimeStamp()
    }
    return super.create(session)
  } 
};
