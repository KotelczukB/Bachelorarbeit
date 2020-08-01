
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import removeFromSession from "../modules/sessions/remove-from-sessions";
import ISession from "../models/Interfaces/session/ISession";
import findOnServiceGetFirst from "../modules/helpers/find-on-service-get-first";
import { default_params } from "../modules/helpers/basic-default-service-params";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";
import createSessionData from "../modules/sessions/create-session-data";
import { createSession } from "../modules/sessions/session-creater";
import logger from "../logger";

// ************************************************
// a)
// Remove incomming client from all sessions
//
// b)
// A client knows a sassion name only if a connection faild and he should be reconnected
// ************************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as {
      data: IClientConnection;
      app: Application;
    };
    // a)
    await removeFromSession(
      data.user_name,
      app.service("sessions")
    ).catch((err: any) =>
      logger.error("Pre clinet reconnect session on search and remove", err)
    );
    // b)

    if (data.session_name) {
      const session: ISession | null = await findOnServiceGetFirst(
        app.service("sessions"),
        {
          query: { session_name: data.session_name, state: { $lt: 2 } },
        }
      );
      if (session) {
        await app
          .service("sessions")
          .patch(
            session._id,
            {
              $push: { clients: data.user_name },
            },
            default_params
          )
          .catch((err: any) =>
            logger.error("Pre clinet reconnect session patch session", err)
          );
        context.data.targetChannel = session.clients_channel;
      } else {
        await createSessionData(
          data.backend_url,
          data.user_name,
          app.service("backends"),
          data.session_name
        ).then(
          async (res) =>
            await createSession(
              app.service("sessions"),
              app.service("backends"),
              res
            )
        );
      }
      return context;
    }
  };
};
