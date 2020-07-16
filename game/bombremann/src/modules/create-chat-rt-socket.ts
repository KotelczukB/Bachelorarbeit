
import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import { ILoginRegisterAnswer } from '../models/ILoginRegisterAnswer';
import { IRT_AppLoginAnswer } from '../models/IRT_AppLoginAnswer';

export default async (client: ILoginRegisterAnswer, app: any) => {
	const rt_server_url = client.rt_servers.filter((elem) => elem.type === 'chat')[0].serverURL;
	const login_response = await fetch(
		`${rt_server_url}/clients`,
		{
			method: 'POST',
			body: JSON.stringify({
				user_name: client.user_name,
				backend_url: client.backend_url,
				target_channel: null,
				session_name: null,
				token: client.token,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	if (login_response.ok) {
		const login_data: IRT_AppLoginAnswer = await login_response.json();
    const chat_client = (feathers as any)();
    console.log(login_data)
		// initial Data fur verbindung und registierung
		const game_socket = io(rt_server_url, {
      transports: ['websocket'],
			query: {
        ...login_data,
        type: 'client'
			},
		});
		// setup connection to service
		chat_client.configure(feathers.socketio(game_socket));
		const chat_service = chat_client.service("client-inputs");
		return chat_service;
	}
	throw new Error('Cannot connect to the realtime server - no socket connection possible!');
}