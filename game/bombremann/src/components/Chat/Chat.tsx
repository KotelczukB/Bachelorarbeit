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
		this.setOnSubmit()
  }
  componentDidUpdate() {
    const elem = document.getElementById("style-1")
    if(elem)
      elem.scrollTo(0, elem.offsetHeight);
  }
  
  public setOnSubmit = () => {
    const form = document.getElementById("_form")
    if(form)
      form.onsubmit = (event: any) => {
        this.handleSubmit()
        event.preventDefault();
      }
  }

	public handleSubmit = () => {
		const elem: any = document.getElementById('_msg-input');
		if (elem && elem.value !== '') {
			const chat = this.state.chat;
			chat.push({
				intern: true,
				user: `@${this.props.user_id}`,
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
			<div className="chat-container" id="_chat">
        <div className="chat_background"></div>
        <div className="chat">
				<div className="chat-whole " id="style-1">
          
					{this.state.chat.map((elem) => (
						<Message msg={elem.msg} user={elem.user} intern={elem.intern} />
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
