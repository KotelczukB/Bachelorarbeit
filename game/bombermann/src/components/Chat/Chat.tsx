import React from 'react';
import './Chat.scss';
import feathers from '@feathersjs/client';
import io from 'socket.io-client';
import { IMessageProps, Message } from './Message';

export interface IChatState {
	chat: IMessageProps[];
}

export interface IChatProps {
	user_id: string;
}

export class Chat extends React.Component<IChatProps, IChatState> {
	app: any = (feathers as any)();
	constructor(props: Readonly<IChatProps>) {
		super(props);
		this.state = {
			chat: [],
		};
	}
	componentDidMount() {
		const socket = io(localStorage.getItem('rt_chat_connection') ?? ''); /*'http://localhost:3030'*/
		this.app.configure(feathers.socketio(socket));
		this.app.configure(feathers.authentication());
		try {
			// this.app.service('client-inputs').create({
			// 	data: { client_input: null }, // 'Say hello and send selected player',
			// });
		} catch (error) {
			console.log(error);
		}
	}

	public handleSubmit = () => {
		const elem: any = document.getElementById('_msg-input');
		if (elem) {
			const chat = this.state.chat;
			chat.push({
				intern: true,
				user: this.props.user_id,
				time: `${
					new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
				} : ${new Date().getMinutes()}`,
				msg: elem.value,
			});
			this.setState({ chat });
			elem.value = '';
			// send data to feahters
		}
	};

	public canSubmit = () => {};

	public render(): JSX.Element {
		return (
			<div className="chat-container" >
				<div className="chat-whole " id="style-1">
					{this.state.chat.map((elem) => (
						<Message msg={elem.msg} time={elem.time} user={elem.user} intern={elem.intern} />
					))}
				</div>
				<div className="chat-form">
					<input
						type="text"
						id="_msg-input"
						placeholder="Your message :)"
						className="form-control custom-control"
					></input>
					<button className="btn btn-dark custom-chat-btn" id="_send-btn" onClick={this.handleSubmit}>
						Send
					</button>
				</div>
			</div>
		);
	}
}
