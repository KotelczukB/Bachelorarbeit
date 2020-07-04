import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { IBackendInput } from '../../models/Interfaces/backend-inputs/IBackendInput';
import getTimeStamp from '../../modules/helpers/getTimeStamp';

export class BackendInputs extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('backend-inputs');
    });
  }

  public async create(data: IBackendInput, params: any): Promise<any> {
    const input: IBackendInput = {
      ...data,
      created_at: getTimeStamp()
    }
    return super.create(input, params)
  } 
};
