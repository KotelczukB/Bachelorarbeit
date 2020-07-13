// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application, Paginated } from "@feathersjs/feathers";
import fetch from "node-fetch";
import { IClientLoginAnswer } from "../models/IClientLoginAnswer";
import { IBackendResponse } from "../models/IBackendResponse";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { params, app } = context as { params: any; app: Application };
    const login_data: IClientLoginAnswer = params.query;
    if (
      context.params.provider !== "server" &&
      context.params.provider !== undefined
    ) {
      // sende Auth an backend weiter
      const backend_resp = await fetch(
        `${login_data.backend_url}/players?user_name=${login_data.user_name}&password=${login_data.password}`,
        {
          method: "GET",
          headers: {
            credentials: "include",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!backend_resp.ok) throw new Error("Backend Login or Register faild!");
      const respJSON: Paginated<any> = await backend_resp.json();
      // setzte backend sein setUp
      if (context.method === "create") {
        login_data.rt_servers = respJSON.data[0].rt_setUp;
        login_data.token = respJSON.data[0].token;
      }
      if (context.method === "find") {
        const user_resp = await app
          .service("users")
          .find({ query: { user_name: login_data.user_name } });
        if (user_resp.data.length > 0)
          await app.service("users").patch(user_resp.data[0]._id, {
            rt_servers: respJSON.data[0].rt_setUp,
            token: respJSON.data[0].token,
          });
      }
    }
    return context;
  };
};
