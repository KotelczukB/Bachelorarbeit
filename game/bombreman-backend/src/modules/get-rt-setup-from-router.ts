import { Application } from "@feathersjs/feathers";
import { IRTServer } from "../models/IRTServer";
import fetch from "node-fetch";
import { _BasicState } from "../models/_SessionState";
import { _RTServerType } from "../models/_RTServerType";
import { getPORT, getHOST, getRouterConnection } from "./get-envs";

//************************************** */
// Remove old rt_servers -> connect to router -> save new Servers -> create backend object auf allen servern der art-> failed? -> repeat
//************************************** */
export const getRTSetup = (app: Application) =>
  fetch(getRouterConnection(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (resp) => {
      if (resp.ok)
        // Feathers blocks removeMany .......
        await app
          .service("rt-server")
          .find({
            query: {
              state: _BasicState.active,
            },
          })
          .then((res: any) =>
            res.data.forEach((element: any) => {
              app.service("rt-server").remove(element._id);
            })
          );
      return resp.json();
    })
    .then(async (body) => {
      await Promise.all(
        body.data.map(
          async (elem: IRTServer) =>
            await app.service("rt-server").create({
              serverURL: elem.serverURL,
              state: elem.state,
              type: elem.type,
            })
        )
      );
      console.log(
        `Server on init sendend request to Router and got new rt_setup`
      );
      return body.data;
    })
    .then(async (resp: IRTServer[]) => {
      // Melde dich auf jedem serverder rt_server classe an
      await Promise.all(resp.map(async (rt_server: IRTServer) => 
        await fetch(`${rt_server.serverURL}/backends`, {
          method: "POST",
          body: JSON.stringify({
            own_url: `http://${getHOST()}:${getPORT()}`,
            type: "backend",
            min_players: app.get("min_players"),
            max_players: app.get("max_players"),
            interval: app.get("custom_interval"),
          }),
          headers: { "Content-Type": "application/json" },
        })));
        console.log(`Server created on rt_server`);
      })
    .catch((err: any) =>
      setTimeout(() => {
        console.log('On get RT_Setup or create backend object', err);
        getRTSetup(app);
      }, 5000)
    );
