import React from 'react';
import { Header } from '../Header/Header';
import './Register.scss';
import { IRTServer } from '../../models/IRTServer';
import { getBackendURL, getRouterConnection } from '../../modules/get-envs';
import getDEVServerURL from '../../modules/getDEV-serverURL';

export interface IRegisterProps {}

export interface IRegisterState {
	password: string | null;
	user_name: string | null;
	backend_url: string;
}

export class Register extends React.Component<IRegisterProps, IRegisterState> {
	constructor(props: Readonly<IRegisterProps>) {
		super(props);
		this.state = {
			password: null,
			user_name: null,
			backend_url: getBackendURL(),
		};
	}

	public handleRegister = async (event: any) => {
		if (this.canSubmit()) {
			event.preventDefault();
			// send to router
			await fetch(getRouterConnection(), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_name: this.state.user_name,
					password: this.state.password,
					backend_url: this.state.backend_url,
				}),
			})
				.then(async (res) => {
					if (res.ok) {
						const body: any = await res.json();
						// set initial server data and player token to local storage
						body.rt_servers.forEach((server: IRTServer) => {
							localStorage.setItem(`rt_server_${server.type}`, getDEVServerURL(server.serverURL));
						});
						localStorage.setItem('token', body.token);

						(this.props as any).history.push({
							pathname: '/game',
							state: { detail: body },
						});
					}
				})
				.catch((err) => window.alert(err));
		} else {
			event.preventDefault();
			window.alert('Check Username or Password!');
		}
	};

	public canSubmit = (): boolean =>
		this.state.password !== null &&
		this.state.user_name !== null &&
		this.validatePassword() &&
		this.validateUsername();

	public setPassword = (event: any) => this.setState({ password: event.target.value });

	public setUsername = (event: any) => this.setState({ user_name: event.target.value });

	public validatePassword = () => this.state.password !== null && this.state.password.length > 5;

	public validateUsername = () => this.state.user_name !== null && this.state.user_name.length >= 5;

	public redirect = (): void => {
		(this.props as any).history.goBack();
	};

	public render(): JSX.Element {
		return (
			<div className="register-overlay">
				<Header />
				<form onSubmit={this.handleRegister} className="register-form">
					<h3 className="title"> Register </h3>
					<div className="form-group">
						<label>Nickname</label>
						<input
							type="text"
							className="form-control"
							id="_user_name"
							placeholder="Nickname"
							aria-describedby="_nameNote"
							onChange={this.setUsername}
						/>
					</div>
					<small id="_nameNote" className="form-text text-muted">
						Min. 5 chars long
					</small>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							className="form-control"
							id="_password"
							placeholder="Password"
							aria-describedby="_pwdNote"
							onChange={this.setPassword}
						/>
						<small id="_pwdNote" className="form-text text-muted">
							Min. 8 chars and 1 digit
						</small>
					</div>
					<button type="submit" className="btn btn-primary btn-lg custom-btn">
						Send
					</button>
					<button type="button" className="btn btn-secondary custom-btn" onClick={this.redirect}>
						Back
					</button>
				</form>
			</div>
		);
	}
}
