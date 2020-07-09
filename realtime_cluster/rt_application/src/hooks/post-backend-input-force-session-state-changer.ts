// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import { IBackendInput } from "../models/Interfaces/backend-inputs/IBackendInput";
import { addToDefaultParams } from "../modules/helpers/basic-default-service-params";
import { SessionState } from "../models/enums/SessionState";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as { data: IBackendInput; app: Application };
    if (data.close_session)
      await app
        .service("sessions")
        .patch(
          {},
          { state: SessionState.closed },
          addToDefaultParams({
            query: { session_name: data.session_name, backend: data.ownURL },
          })
        );
    return context;
  };
};
