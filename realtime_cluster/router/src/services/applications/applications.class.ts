import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { Paginated } from '@feathersjs/feathers';
import { _RealTimeAppStatus } from '../../models/real-time/_RealTimeAppStatus';
import { _RealTimeAppType } from '../../models/real-time/_RealTimeAppType';
import { IRealTimeApp } from '../../models/real-time/IReatTimeApp';

export class Applications extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('applications');
    });
  }

  public async find(params: any): Promise<any[] | Paginated<any>> {
    if(Object.keys(params.query).length < 1)
      return await super.find({query: {state: _RealTimeAppStatus.active, type: { $in: [_RealTimeAppType[_RealTimeAppType.chat], _RealTimeAppType[_RealTimeAppType.application]]}}})
    return await super.find({query: params.query}); 
  }

  public async create(data: IRealTimeApp): Promise<IRealTimeApp> {
    const server = await super.find({query: {connection_string: data.connection_string, state: _RealTimeAppStatus.active}}) as Paginated<IRealTimeApp>;
    if(server.data !== undefined && server.data.length > 0){
      return server.data[0];
    }
    return await super.create(data);
  }
};
