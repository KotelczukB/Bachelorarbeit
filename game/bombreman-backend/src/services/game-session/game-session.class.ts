import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { Paginated } from '@feathersjs/feathers';
import { IGameSesion } from '../../models/IGameSession';
import { IGameSessionCreation } from '../../models/IGameData';
import gameSessionCreater from '../../modules/game-session-creater';
import { IRTServer } from '../../models/IRTServer';

export class GameSession extends Service {
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then(db => {
      this.Model = db.collection('game-session');
    });
  }

  public create = async (data: IGameSessionCreation): Promise<IGameSesion> => {
    const game_session: Paginated<IGameSesion> = await super.find({query: {rt_session: data.game_channel}}) as Paginated<IGameSesion>;
    if(game_session.data !== undefined && game_session.data.length > 0){
      super.patch(game_session.data[0]._id, { $push: {player_tokens: data.token}})
      return game_session.data[0];
    }
    const rt_server: Paginated<IRTServer> = await super.find({query: {serverURL: data.rt_serverURL}}) as Paginated<IRTServer>
    if(rt_server.data === undefined || rt_server.data.length < 1)
      throw new Error('Provieded realtimeServer not found');
    const newSession = gameSessionCreater(data, rt_server.data[0]);
    return await super.create(newSession)
  }
};
