import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { IBackendResponse } from '../../models/Interfaces/backend-inputs/IBackendResponse';
import getTimeStamp from '../../modules/helpers/getTimeStamp';

export class BackendInputs extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('backend-inputs');
    });
  }

  public async create(data: IBackendResponse, params: any): Promise<any> {
    const input: IBackendResponse = {
      ...data,
      created_at: getTimeStamp()
    }
    return super.create(input, params)
  } 
};
