import feathers from "@feathersjs/client";
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

export default () => {
	// const chat_client = (feathers as any)();
	// 	// initial Data fur verbindung und registierung
	// 	const chat_socket = io('game_rt.serverURL', {
	// 		query: {
	// 			target_session: "",
	// 			user_name: "",
	// 			backend_url: "",
	// 			type: 'client'
	// 		}
	// 	});
	// 	chat_client.configure(socketio(chat_socket));
	// 	const chat_service = chat_client.service("app.get('rt_game_backend_service')");
	// 	chat_service.on('created', (data: any) => {
	// 		// update game stuff
	// 	})
  //   console.log(`Sever connected to chat_application Server with socket`);
  //   return chat_client;
  return ""
}