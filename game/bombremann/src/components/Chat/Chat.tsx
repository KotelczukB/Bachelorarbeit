import React from 'react';
import './Chat.scss';
import { IMessageProps, Message } from './Message';
import createChatRtSocket from '../../modules/create-chat-rt-socket';
import { ILoginRegisterAnswer } from '../../models/ILoginRegisterAnswer';

export interface IChatState {
	chat: IMessageProps[];
}

export interface IChatProps {
	token: string;
	user_id: string;
	client_data: ILoginRegisterAnswer;
}

export class Chat extends React.Component<IChatProps, IChatState> {
	chat_socket: any;
	constructor(props: Readonly<IChatProps>) {
		super(props);
		this.state = {
			chat: [],
		};
	}
	componentDidMount = async () => {
		if (!this.chat_socket)
			createChatRtSocket(this.props.client_data, this).then((socket) => {
				// subscribe to chat
				socket.on('chat created', (data: IMessageProps) => {
					console.log(data);
					const tempChat: IMessageProps[] = this.state.chat;
					tempChat.push(data);
					tempChat.map(
						(elem) =>
							(elem = {
								...elem,
								intern: elem.user === this.props.user_id,
							})
					);
					this.setState({ chat: tempChat });
				});
				console.log('connection to realtime app created');
				this.chat_socket = socket;
			});
		this.setOnSubmit();
	};
	componentDidUpdate() {
		const elem = document.getElementById('style-1');
		if (elem) elem.scrollTo(0, elem.offsetHeight);
	}

	public setOnSubmit = () => {
		const form = document.getElementById('_form');
		if (form)
			form.onsubmit = async (event: any) => {
				event.preventDefault();
				await this.handleSubmit();
			};
	};

	public handleSubmit = () => {
		const elem: any = document.getElementById('_msg-input');
		if (elem && elem.value !== '') {
			console.log('TEST');
			try {
				this.chat_socket.emit(
					'create',
					'chat',
					{
						user: this.props.user_id,
						msg: elem.value,
						intern: false,
						token: this.props.token,
						created_at: +new Date(),
					},
					(err: any, data: any) => console.log(err, data)
				);
			} catch (err) {
				window.alert('ups chat is down ...');
			}
			elem.value = '';
		}
	};

	public canSubmit = () => {};

	public render(): JSX.Element {
		return (
			<div className="chat-container" id="_chat">
				<div className="chat_background"></div>
				<div className="chat">
					<div className="chat-whole " id="style-1">
						{this.state.chat.map((elem, idx) => (
							<Message msg={elem.msg} user={elem.user} intern={elem.intern} timestamp={idx} key={idx} />
						))}
					</div>
					<form className="chat-form" id="_form">
						<input
							type="text"
							id="_msg-input"
							placeholder="Your message :)"
							className="form-control custom-control"
						></input>
						<button className="btn btn-dark custom-chat-btn" id="_send-btn">
							Send
						</button>
					</form>
				</div>
			</div>
		);
	}
}
