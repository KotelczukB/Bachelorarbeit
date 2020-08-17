
import io from 'socket.io-client';
import { ILoginRegisterAnswer } from '../models/ILoginRegisterAnswer';
import { IRT_AppLoginAnswer } from '../models/IRT_AppLoginAnswer';
import getDEVServerURL from './getDEV-serverURL';

export default async (client: ILoginRegisterAnswer) => {
	const serverUrl = `${getDEVServerURL(client.rt_servers.filter((elem) => elem.type === 'application')[0].serverURL)}/clients`.replace('http://','https://');
	const login_response = await fetch(
		serverUrl,
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
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			},
		}
	);
	if (login_response.ok) {
		const login_data: IRT_AppLoginAnswer = await login_response.json();
		// initial connection and registration data
		console.log('Creating connection with SOCKET')
		const game_socket = io(getDEVServerURL(client.rt_servers.filter((elem) => elem.type === 'application')[0].serverURL), {
			query: {
        ...login_data,
        type: 'client'
			},
		});
		localStorage.setItem('session_name', login_data.session_name+'')
		game_socket.on('backend-inputs created', (data: any) => {
				console.log('RECIVED GAME DATA FROM BACKEND', data)
			localStorage.setItem('game_data', JSON.stringify(data));
		});
		console.log(`Game connected to game_application Server with socket`);
		return game_socket;
	}
	throw new Error(`GAME - Cannot connect to the realtime server - no socket connection possible! ${login_response.status}`);
};
