import { Application } from "@feathersjs/feathers";
import { IRTServer } from "../models/IRTServer";
import fetch from "node-fetch";
import { _BasicState } from "../models/_SessionState";
import { _RTServerType } from "../models/_RTServerType";
import { getPORT, getHOST, getRouterConnection } from "./get-envs";
import io from "socket.io-client";
import logger from "../logger";

//************************************** */
// remove old rt_servers -> connect to router -> save new Servers -> create backend object on each rt server -> failed? -> repeat
//************************************** */
export const getRTSetup = (app: Application) =>
  fetch(getRouterConnection(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(async (resp) => {
      if (resp.ok)
        // Feathers blocks removeMany
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
      logger.info(
        `Server on init sendend request to Router and got new rt_setup`
      );
      return body.data;
    })
    .then(async (resp: IRTServer[]) => {
      // Register on each server
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
        logger.info(`Server created on rt_server`);
      

      // Socket connection on pure socket

      const game_rt = resp.find(
        (elem) => elem.type === _RTServerType.application
        );
        if (!game_rt) throw new Error("Cannot create rt_server connection");
        logger.info("Astimated connection with socket on ", game_rt)
        // initial Data fur verbindung und registierung
        const socket = io(game_rt.serverURL, {
          query: {
            backend_url: `http://${getHOST()}:${getPORT()}`,
            type: "backend",
          },
        });
        // Comment out for HTTP based function
        socket.on("backend-message created" , (data: any) => {
          // Game RULEZ magic
          //logger.info('NEW CLIENT INPUT')
          app
            .service("player-inputs")
            .create(data)
            .then(
              (snapshot: any) => 
                socket.emit('create','backend-inputs', snapshot)
            )
            .catch((err: any) => logger.error('Exception on create player-input ', err))
          });
      }
    )
    .catch((err: any) =>
      setTimeout(() => {
        logger.error('Exception on getting RT_Setup or create backend object ', err);
        getRTSetup(app);
      }, 5000)
    );
