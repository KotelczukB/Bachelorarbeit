// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application, Paginated } from "@feathersjs/feathers";
import { IBackendResponse } from "../models/Interfaces/backend-inputs/IBackendResponse";
import { addToDefaultParams } from "../modules/helpers/basic-default-service-params";
import { _SessionState } from "../models/enums/_SessionState";
import ISession from "../models/Interfaces/session/ISession";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context as { result: IBackendResponse; app: Application };
    if(result.game_started) {
      const session: Paginated<ISession> = await app.service('sessions').find(addToDefaultParams({query: {session_name: result.session_name}}))
      await app.service('sessions').patch(session.data[0]._id, {state: _SessionState.closed})
    }
    return context;
  };
};
