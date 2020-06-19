import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';

export class GameApps extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('game-apps');
    });
  }
  public async create(data: any, params: any): Promise<any> {
    const serverData = {
      serverURL: data.serverURL,
      serverName: data.serverName,
    };
    return super.create(serverData, params);
  }
};
