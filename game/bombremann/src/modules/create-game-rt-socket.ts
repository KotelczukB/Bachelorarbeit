import feathers from "@feathersjs/client";
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { ILoginRegisterAnswer } from "../models/ILoginRegisterAnswer";


export default async (client: ILoginRegisterAnswer) => {
  const rt_application_login = await fetch(`${client.rt_servers.filter(elem => elem.type === "application")[0].serverURL}/clients`, {
    method: "POST",
    body: JSON.stringify({
      user_name: client.user_name,
      backend_url: client.backend_url,
      target_channel: null,
      session_name: null,
      token: client.token
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  debugger
  const game_client = (feathers as any)();
		// initial Data fur verbindung und registierung
		const game_socket = io(client.rt_servers.filter(elem => elem.type === "application")[0].serverURL, {
			query: {
				target_session: "",
				user_name: "",
				backend_url: "",
				type: 'client'
			}
		});
		game_client.configure(socketio(game_socket));
		const game_service = game_client.service("app.get('rt_game_backend_service')");
		game_service.on('created', (data: any) => {
			// update game stuff
		})
    console.log(`Sever connected to game_application Server with socket`);
    return game_client;
  return ""
}