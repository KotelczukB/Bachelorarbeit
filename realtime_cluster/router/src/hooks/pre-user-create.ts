// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import fetch from "node-fetch";
import { IClientLoginAnswer } from "../models/IClientLoginAnswer";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as {
      data: IClientLoginAnswer;
      app: Application;
    };
    if (
      context.params.provider !== "server" && context.params.provider !== undefined
    ) {
      // sende Auth an backend weiter
      const backend_resp = await fetch(`${data.backend_url}/players`, {
        method: context.method === "create" ? "POST" : "GET",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!backend_resp.ok) throw new Error("Backend Login or Register faild!");
      const respJSON = await backend_resp.json();
      // setzte backend sein setUp
      if (context.method === "create") {
        data.rt_servers = respJSON.rt_setUp;
        data.token = respJSON.token;
      }
      if (context.method === "find") {
        const user_resp = await app
          .service("users")
          .find({ query: { user_name: data.user_name } });
        if (user_resp.data.length > 0)
          await app.service("users").patch(user_resp.data[0]._id, {
            rt_servers: respJSON.rt_setUp,
            token: respJSON.token,
          });
      }
    }
    return context;
  };
};
