import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import ISession from '../../Models/session/ISession';

export class Sessions extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('sessions');
    });
  }
  public async create(name: any, params: any): Promise<any> {
    const data: ISession = {
      createdAt: new Date(),
      session_name: name,
      activ: true,
      client_names: []
    }
    return super._create(data, params)
  } 

  public async patch(data: {client_names: string} | any, params: {session_name: string} | any): Promise<any> {
    return super._patch(null, data, params);
  } 
};