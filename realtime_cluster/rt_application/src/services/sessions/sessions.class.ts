import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import ISession from '../../models/Interfaces/session/ISession';
import ISessionCreate from '../../models/Interfaces/session/ISessionCreate';
import { _SessionState } from '../../models/enums/_SessionState';
import getTimeStamp from '../../modules/helpers/getTimeStamp';

export class Sessions extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('sessions');
    }).catch((err: any) => console.log(err));
  }
  public async create(data: ISessionCreate): Promise<any> {
    const session: ISession = {
      createdAt: new Date(),
      session_name: data.name,
      backends_channel: `backend_${data.backend_url}`,
      clients_channel: `clinet_${data.name}`,
      min_clients: data.client_min,
      max_clients: data.client_max,
      interval_value: data.interval,
      state: _SessionState.active,
      clients: [data.client_id],
      backend: [data.backend_url],
      syncPing: 0,
      newest_update: getTimeStamp()
    }
    return super.create(session)
  } 
};
