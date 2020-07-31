
import { Hook, HookContext, Application } from "@feathersjs/feathers";
import fetch from "node-fetch";
import { IClientLoginAnswer } from "../models/IClientLoginAnswer";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context as { data: IClientLoginAnswer, app: Application };
    const login_data: IClientLoginAnswer = data;
    if (
      context.params.provider !== "server" &&
      context.params.provider !== undefined
    ) {
      // send Auth to backend
        const backend_resp = await fetch(`${login_data.backend_url}/players`, {
          method: "POST",
          body: JSON.stringify(login_data),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
        });
      if (!backend_resp.ok) throw new Error("Backend Login or Register faild!");
      const respJSON = await backend_resp.json();
      // set backends setup
      if (context.method === "create") {
        login_data.rt_servers = respJSON.rt_setUp;
        login_data.token = respJSON.token;
      }
      if (context.method === "find") {
        const user_resp = await app
          .service("users")
          .find({ query: { user_name: login_data.user_name } });
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
