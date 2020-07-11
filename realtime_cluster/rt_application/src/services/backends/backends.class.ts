import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { addToDefaultParams } from '../../modules/helpers/basic-default-service-params';

export class Backends extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('backends');
    });
  }

  public async create (data: any) {
    const result = await super.find(addToDefaultParams({query : {...data}}))
    if(result !== undefined && (result as any).length > 0)
    // CHACK um die aktion abzubrechen ohne einen fehler werfen zu mussen
      return super.find({query: {id: 'none'}})
    return super.create(data);
  }
};
