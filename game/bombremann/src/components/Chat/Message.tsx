import React from 'react';
import './Chat.scss';
import { use } from 'matter';

export interface IMessageProps {
	intern: boolean;
	user: string;
	msg: string;
}
export class Message extends React.Component<IMessageProps, {}> {
	constructor(props: Readonly<IMessageProps>) {
		super(props);
	}

	public convertUserName = (username: string): string => {
		return username.split('').length < 8 ? username : this.getShortenUserName(username);
	};

	public getShortenUserName = (username: string) =>
		`${username.slice(0, 4)}_${username.slice(username.length - 6, username.length - 1)}`;

	public render(): JSX.Element {
		return (
			<div className="msg-container">
				<div className="user-name">
					<span
						className="msg-user-label"
						data-toggle="tooltip"
            data-placement="top"
						title={this.props.user}
					>
						{this.convertUserName(this.props.user)}
					</span>
				</div>
				<span className="msg-line"> | </span>
				<div className="user-msg">
					<span className="msg-label">{this.props.msg}</span>
				</div>
			</div>
		);
	}
}
