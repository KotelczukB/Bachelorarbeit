import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { _BasicState } from "../../models/_SessionState";
import { IPlayerInputDTO } from "../../models/IPlayerInput";

interface ServiceOptions {}

export class PlayerInputs implements ServiceMethods<IPlayerInputDTO> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find(
    params?: Params
  ): Promise<IPlayerInputDTO[] | Paginated<IPlayerInputDTO>> {
    throw new Error("Method not implemented");
  }

  async get(id: Id, params?: Params): Promise<IPlayerInputDTO> {
    throw new Error("Method not implemented");
  }

  async create(
    data: IPlayerInputDTO,
    params?: Params
  ): Promise<IPlayerInputDTO> {
    const application_data = data.app_data;
    if (application_data.own_game_snapshots.length >= this.app.get('min_players')) {

      // const running_res: any[] | Paginated<IGameSesion> = await this.app.service("game-session").find({
      //   query: {
      //     name: application_data.game_session,
      //     state: _BasicState.active,
      //     rt_server: application_data.rt_serverURL,
      //     rt_session: application_data.rt_session,
      //     player_tokens: application_data.tokens,
      //   },
      // });
      // const game_session = (running_res as Paginated<IGameSesion>).data[0]
      //   ? (running_res as Paginated<IGameSesion>).data[0]
      //   : await this.app
      //       .service("game-session")
      //       .create(gameSessionCreater(application_data));


      // Get Game Session on backend_session_name
      //put id into patch
      await this.app.service("game-session").patch(null, {
        $push: { player_inputs: application_data.own_game_snapshots },
      });
      return (data = {
        ...data,
        app_data: application_data,
      });
    } else {
      throw new Error("Dataset incomplete");
    }
  }

  async update(
    id: NullableId,
    data: IPlayerInputDTO,
    params?: Params
  ): Promise<IPlayerInputDTO> {
    throw new Error("Method not implemented");
  }

  async patch(
    id: NullableId,
    data: IPlayerInputDTO,
    params?: Params
  ): Promise<IPlayerInputDTO> {
    throw new Error("Method not implemented");
  }

  async remove(id: NullableId, params?: Params): Promise<IPlayerInputDTO> {
    throw new Error("Method not implemented");
  }
}
