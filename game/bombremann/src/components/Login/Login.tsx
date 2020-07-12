import React from 'react';
import './Login.scss'
import { Header } from '../Header/Header';
import createLoginBody from '../../modules/create-login-body';
import { ILoginRegisterAnswer } from '../../models/ILoginRegisterAnswer';
import { IRTServer } from '../../models/IRTServer';

export interface ILoginProps {}

export interface ILoginState {
	password: string | null;
	user_name: string | null;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
	constructor(props: Readonly<ILoginProps>) {
		super(props);
		this.state = {
			password: null,
			user_name: null,
		};
	}

  
  public handleSubmit = async (event: any): Promise<void> => {
		if(this.canSubmit()) {
			// sende an den Router
			await fetch('localhost:3080/users', {
				method: 'GET',
				body: JSON.stringify(createLoginBody(this.state))
			}).then(async (res) => {
				if(res.ok) {
					const body: ILoginRegisterAnswer = await res.json();
					// setzte server_stuff und token in den localStorage
					body.rt_servers.forEach((server: IRTServer) => { localStorage.setItem(`rt_server_${server.type}`, server.serverURL) });
					localStorage.setItem('token', body.token);
					// melde dich beim RtServer an


					// weiter zum spiel
					(this.props as any).history.push('/game');
				}
			});
		} else {
			event.preventDefault();
		}
	};

	public redirect = (): void => {
		(this.props as any).history.push('/register');
	};

	public canSubmit = (): boolean =>
		this.state.password !== null &&
		this.state.user_name !== null &&
		this.validateEmail(this.state.user_name) &&
		this.validatePassword(this.state.password);

	public validatePassword = (text: string): boolean =>
		new RegExp('/^(?=.*\d).{8,}$/').test(text) ? true : false;

	public validateEmail = (text: string): boolean => text.length > 5;

	public setUserName = (event: any) => this.setState({ user_name: event.target.value });

	public setPassword = (event: any) => this.setState({ password: event.target.value });

	public render(): JSX.Element {
		return (
			<div className="login-overlay">
        <Header/>
				<form onSubmit={this.handleSubmit} className='login-form'>
          <h3 className="title"> Login </h3>
					<div className="form-group">
						<label>Email address</label>
						<input
							type="text"
							className="form-control"
							id="_user_name"
							placeholder="Unicron"
							aria-describedby="_nameNote"
							onChange={this.setUserName}
						/>
					<small id="_nameNote" className="form-text text-muted">
							Min. 5 chars long
						</small>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							className="form-control"
							id="_password"
							placeholder="Password"
							onChange={this.setPassword}
						/>
						<small id="_nameNote" className="form-text text-muted">
							Min. 8 chars and 1 digit
						</small>
					</div>
					<button type="submit" className="btn btn-primary btn-lg custom-btn">
						Login
					</button>
					<button type="button" className="btn btn-secondary custom-btn" onClick={this.redirect}>
						Register
					</button>
				</form>
			</div>
		);
	}
}
