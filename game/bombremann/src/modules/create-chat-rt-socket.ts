
import io from 'socket.io-client';
import { ILoginRegisterAnswer } from '../models/ILoginRegisterAnswer';
import { IRT_AppLoginAnswer } from '../models/IRT_AppLoginAnswer';
import getDEVServerURL from './getDEV-serverURL';

export default async (client: ILoginRegisterAnswer, app: any) => {
	const rt_server_url = getDEVServerURL(client.rt_servers.filter((elem) => elem.type === 'chat')[0].serverURL);
	const session_name = localStorage.getItem('session_name');
	const login_response = await fetch(
		`${rt_server_url}/clients`,
		{
			method: 'POST',
			body: JSON.stringify({
				user_name: client.user_name,
				backend_url: client.backend_url,
				target_channel: null,
				session_name: session_name,
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
    console.log(login_data)
		// initial connection and registration data
		console.log('Creating connection with CHAT', rt_server_url)
		const game_socket = await io(rt_server_url, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity,
			query: {
        ...login_data,
        type: 'client'
			},
		});
		// setup connection to service
		return game_socket;
	}
	throw new Error('CHAT - Cannot connect to the realtime server - no socket connection possible!');
}