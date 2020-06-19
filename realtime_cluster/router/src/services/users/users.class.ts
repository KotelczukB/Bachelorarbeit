import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';

export class Users extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('users');
    });
  }

  // Override with own func
  public async create (data: any, params: any): Promise<any> {
    if(!data.succeed)
      data.routeranswer = new Error('could not authentificate at backend server');
    return await super._create(data, params);
  }
};
