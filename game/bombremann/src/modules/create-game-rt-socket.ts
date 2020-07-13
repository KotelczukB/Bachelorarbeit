import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { ILoginRegisterAnswer } from '../models/ILoginRegisterAnswer';
import { IRT_AppLoginAnswer } from '../models/IRT_AppLoginAnswer';

export default async (client: ILoginRegisterAnswer) => {
	const login_response = await fetch(
		`${client.rt_servers.filter((elem) => elem.type === 'application')[0].serverURL}/clients`,
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
    const game_client = feathers();
    console.log(login_data)
		// initial Data fur verbindung und registierung
		const game_socket = io(client.rt_servers.filter((elem) => elem.type === 'application')[0].serverURL, {
      transports: ['websocket'],
			query: {
        ...login_data,
        type: 'client'
			},
		});
		game_client.configure(socketio(game_socket));
		const game_service = game_client.service("client-inputs");
		game_service.on('created', (data: any) => {
			localStorage.setItem('game_data', JSON.stringify(data));
		});
		console.log(`Game connected to game_application Server with socket`);
		return game_service;
	}
	throw new Error('Cannot connect to the realtime server - no socket connection possible!');
};