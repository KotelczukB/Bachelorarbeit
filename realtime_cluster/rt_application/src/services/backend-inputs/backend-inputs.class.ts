import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { IBackendResponse } from '../../models/Interfaces/backend-inputs/IBackendResponse';
import getTimeStamp from '../../modules/helpers/getTimeStamp';

export class BackendInputs extends Service {
  app: any;
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);
    this.app = app;

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('backend-inputs');
    });
  }

  public async create(data: IBackendResponse, params: any): Promise<any> {
    const input: IBackendResponse = {
      ...data,
      ping: getTimeStamp() - this.app.get('lastsend')
    }
    return super.create(input, params)
  } 
};
