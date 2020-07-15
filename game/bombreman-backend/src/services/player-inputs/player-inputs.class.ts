import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { _BasicState } from "../../models/_SessionState";
import { IPlayerInput, IClientInput } from "../../models/IPlayerInput";
import { IGameSesion } from "../../models/IGameSession";
import * as R from "ramda";
import check_on_cheat from "../../modules/check_on_hacker";

interface ServiceOptions {}

export class PlayerInputs implements ServiceMethods<IPlayerInput> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find(
    params?: Params
  ): Promise<IPlayerInput[] | Paginated<IPlayerInput>> {
    throw new Error("Method not implemented");
  }

  async get(id: Id, params?: Params): Promise<IPlayerInput> {
    throw new Error("Method not implemented");
  }

  // Patch session, player inputs werden nicht in den Stack gespeichet
  async create(data: IPlayerInput, params?: Params): Promise<IPlayerInput> {
    const result: Paginated<IGameSesion> = (await this.app
      .service("game-session")
      .find({
        query: {
          game_session: data.session_name,
          state: _BasicState[_BasicState.active],
        },
      })) as Paginated<IGameSesion>;
    // den letzten stand holen
    const game_state = result.data[0];
    // grupiere nach player
    const groupping = R.groupBy(
      (elem: IClientInput | null) => elem?.token ?? "null"
    );
    const grupped = groupping(game_state.player_inputs);
    // Check ob jemand cheatet
    const new_state = check_on_cheat(grupped, data.client_inputs);
      // setzte neuen state in die DB
    await this.app.service("game-session").patch(result.data[0]._id, {
      player_inputs: new_state,
    });
    data.game.id = result.data[0]._id;
    return data;
  }

  async update(
    id: NullableId,
    data: IPlayerInput,
    params?: Params
  ): Promise<IPlayerInput> {
    throw new Error("Method not implemented");
  }

  async patch(
    id: NullableId,
    data: IPlayerInput,
    params?: Params
  ): Promise<IPlayerInput> {
    throw new Error("Method not implemented");
  }

  async remove(id: NullableId, params?: Params): Promise<IPlayerInput> {
    throw new Error("Method not implemented");
  }
}
