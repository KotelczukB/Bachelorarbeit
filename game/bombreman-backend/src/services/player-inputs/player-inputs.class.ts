import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { _BasicState } from "../../models/_SessionState";
import { IPlayerInput} from "../../models/IPlayerInput";
import { IGameSesion } from "../../models/IGameSession";

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
        },
      })) as Paginated<IGameSesion>;
    const game_state = result.data[0];
    const selected = data.client_inputs.map(input => { if(input && input.app) return input.app.client_selected })
      game_state.state = game_state.players_selected.length === game_state.player_tokens.length &&  game_state.players_selected.length >= game_state.min_player ? _BasicState.inactive : _BasicState.active
      game_state.player_inputs = data.client_inputs.filter(elem => elem !== null)
      game_state.players_selected = selected.filter(elem => elem !== null)
    await this.app.service("game-session").update(game_state._id, game_state);
    data.game_id = result.data[0]._id;
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
