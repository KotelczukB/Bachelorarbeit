import { Application } from "@feathersjs/feathers";
import { IRTServer } from "../models/IRTServer";
import fetch from "node-fetch";
import { _BasicState } from "../models/_SessionState";

//************************************** */
// Remove old rt_servers -> connect to router -> save new Servers
//************************************** */
export const getRTSetup = (app: Application) =>
  fetch(app.get("router_url"), {
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
              state: _BasicState.active },
          })
          .then((res: any) =>
            res.data.forEach((element: any) => {
              app.service("rt-server").remove(element._id)
            })
          );
      return resp.json();
    })
    .then((body) =>
      body.data.forEach(
        async (elem: IRTServer) =>
          await app.service("rt-server").create({
            serverURL: elem.serverURL,
            state: elem.state,
            type: elem.type,
          })
      )
    )
    .then((resp: any) => {
      console.log(`Server on init sendend request to Router and got new rt_setup`);
    })
    .catch((err: any) =>
    setTimeout(() => {
      console.log(err)
        getRTSetup(app);
      }, 5000)
    );
