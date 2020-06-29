// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import ISession from "../models/Interfaces/session/ISession";
import { minClientsRequirement, validateSessionRequierdProps } from "../modules/sessions/validate-session";
import { getRunningSessionState } from "../modules/sessions/session-get-state";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context as {result: ISession, app: any};
    validateSessionRequierdProps(result);
    minClientsRequirement(result);
    getRunningSessionState(result);
    return context;
  };
};


