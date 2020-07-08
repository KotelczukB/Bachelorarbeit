import React from 'react';
import './Chat.scss';

export interface IMessageProps {
	intern: boolean;
	user: string;
	msg: string;
	time: string;
}
export class Message extends React.Component<IMessageProps, {}> {
	constructor(props: Readonly<IMessageProps>) {
		super(props);
	}

	public render(): JSX.Element {
		return (
			<div className="msg-container">
				<div className="info_container">
					<div className="user-name">
						<label className="msg-user-label">{this.props.user}</label>
					</div>
					<div className="time-msg">
						<label className="time-label">{this.props.time}</label>
					</div>
				</div>
				<div className="user-msg">
					<label className="msg-label">{this.props.msg}</label>
				</div>
			</div>
		);
	}
}
