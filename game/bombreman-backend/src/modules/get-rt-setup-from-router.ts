import { Application } from "@feathersjs/feathers";
import { IRTServer } from "../models/IRTServer";
import fetch from "node-fetch";
import { _BasicState } from "../models/_SessionState";
import { _RTServerType } from "../models/_RTServerType";
import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

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
    .then(async (body) => {
      await Promise.all(body.data.map(
        async (elem: IRTServer) =>
          await app.service("rt-server").create({
            serverURL: elem.serverURL,
            state: elem.state,
            type: elem.type,
          })
      ));
      console.log(`Server on init sendend request to Router and got new rt_setup`);
      return body.data;
    }
    )
    .then((resp: IRTServer[]) => {
      // Get Game server und init socketio CLIENT mit callback.
      const game_rt = resp.find(elem => elem.type === _RTServerType.application)
      if(!game_rt) 
        throw new Error('Cannot create rt_server connection');
      const client = feathers();
      // initial Data fur verbindung und registierung
      const socket = io(game_rt.serverURL, {
        query: {
          own_url: `http://${app.get('host')}:${app.get('port')}`,
          type: 'backend',
          min_players: app.get("min_players"),
          max_players: app.get("max_players"),
          interval: app.get("custom_interval"),
        }
      });
      client.configure(socketio(socket));
      const rt_input_service = client.service(app.get('rt_game_backend_service'));
      rt_input_service.on('created', (data: any) => {
        // update game stuff
      })
      console.log(`Server connected to rt_application Server with socket`);
      
    })
    .catch((err: any) =>
    setTimeout(() => {
      console.log(err)
        getRTSetup(app);
      }, 5000)
    );
