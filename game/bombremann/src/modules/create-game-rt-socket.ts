import feathers from "@feathersjs/client";
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
export default () => {
  // const game_client = (feathers as any)();
	// 	// initial Data fur verbindung und registierung
	// 	const game_socket = io('game_rt.serverURL', {
	// 		query: {
	// 			target_session: "",
	// 			user_name: "",
	// 			backend_url: "",
	// 			type: 'client'
	// 		}
	// 	});
	// 	game_client.configure(socketio(game_socket));
	// 	const game_service = game_client.service("app.get('rt_game_backend_service')");
	// 	game_service.on('created', (data: any) => {
	// 		// update game stuff
	// 	})
  //   console.log(`Sever connected to game_application Server with socket`);
  //   return game_client;
  return ""
}