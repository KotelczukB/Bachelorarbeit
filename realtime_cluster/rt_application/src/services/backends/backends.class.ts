import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { addToDefaultParams } from '../../modules/helpers/basic-default-service-params';
import { IBackend } from '../../models/Interfaces/backends/IBackend';
import logger from '../../logger';

export class Backends extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('backends');
    });
  }

  public async create (data: IBackend) {
    const result = await super.find(addToDefaultParams({query : {own_url: data.own_url}}))
    if(result !== undefined && (result as any).length > 0)
      super.remove((result as any)[0]._id).catch((err: any) => logger.error(`Exception on remove on create backend ${err.message}`))
    return super.create(data);
  }
};
