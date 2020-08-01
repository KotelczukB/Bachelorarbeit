
import { Hook, HookContext, Paginated } from "@feathersjs/feathers";
import findExistingClient from "../modules/clients/find-existing-client";
import { IClientConnection } from "../models/Interfaces/clients/IClientConnection";
import logger from "../logger";

// ************************************************
// Entferne den Client aus der DB, Redundanzen vermeidung
// ************************************************

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app, path } = context as {
      data: IClientConnection;
      app: any;
      path: string;
    };
    const exsists: Paginated<IClientConnection> = await app
      .service("clients")
      .find({ query: { user_name: data.user_name, token: data.token } })
      .catch((err: any) =>
        logger.error(`Pre client handle existing err on find ${err.message}`)
      );
    if (exsists.data && exsists.data.length > 0)
      await Promise.all(
        exsists.data.map(
          async (client: any) => await app.service("clients").remove(client._id)
        )
      ).catch((err: any) => logger.error(`Pre client handle existing ${err.message}`));
    return context;
  };
};
