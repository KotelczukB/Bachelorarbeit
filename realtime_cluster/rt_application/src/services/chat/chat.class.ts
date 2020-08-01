import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { Paginated, Params } from '@feathersjs/feathers';
import { IChatMessage } from '../../models/Interfaces/chat/IChatMessage';
import { addToDefaultParams } from '../../modules/helpers/basic-default-service-params';
import ISession from '../../models/Interfaces/session/ISession';

export class Chat extends Service {
  app: Application;
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);
    this.app = app;
    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('chat');
    });
  }

  public find = async (param: Params): Promise<IChatMessage[]> => {
    if(param.query && param.query.session_name) {
      const session: Paginated<ISession> = await this.app.service('sessions').find(addToDefaultParams({query: {session_name: param.query.session_name}})) as Paginated<ISession>;
      if(session.data.length < 1)
        throw new Error('Session do not exsists')
      return super._find({query: {channel: session.data[0].clients_channel}})
    } else {
      throw new Error('No session_name found in query')
    }
  }
};
