import React from 'react';
import './Login.scss'
import { Header } from '../Header/Header';
import { IRTServer } from '../../models/IRTServer';
import { getBackendURL, getRouterConnection } from '../../modules/get-envs';

export interface ILoginProps {}

export interface ILoginState {
	password: string | null;
	user_name: string | null;
	backend_url: string;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
	constructor(props: Readonly<ILoginProps>) {
		super(props);
		this.state = {
			password: null,
			user_name: null,
			backend_url: getBackendURL()
		};
	}

  
  public handleLogin = async (event: any): Promise<void> => {
		if(this.canSubmit()) {
			event.preventDefault();
			// sende an den Router
			await fetch(`${getRouterConnection()}?user_name=${this.state.user_name}&password=${this.state.password}&backend_url=${this.state.backend_url}`, {
				method: 'GET',
				headers: {
					"Access-Control-Allow-Origin": "*"
				}
			}).then(async (res) => {
				if(res.ok) {
					const body: any = await res.json();
					if(body.data.length < 1)
						throw new Error('You have to register first')
					body.data[0].rt_servers.forEach((server: IRTServer) => { localStorage.setItem(`rt_server_${server.type}`, server.serverURL) });
					localStorage.setItem('token', body.data[0].token);
					(this.props as any).history.push({
						pathname: '/game',
						state: { detail: body.data[0] }
					});
				}
			}).catch(err => window.alert(err));
		} else {
			event.preventDefault();
			window.alert("Check Username or Password!")
		}
	};

	public redirect = (): void => {
		(this.props as any).history.push('/register');
	};

	public canSubmit = (): boolean =>
		this.state.password !== null &&
		this.state.user_name !== null &&
		this.validateUsername(this.state.user_name) &&
		this.validatePassword(this.state.password);

	public validatePassword = (text: string): boolean =>
		text.length > 6;

	public validateUsername = (text: string): boolean => text.length >= 5;

	public setUserName = (event: any) => {this.setState({ user_name: event.target.value }); console.log(event.target.value)}

	public setPassword = (event: any) => this.setState({ password: event.target.value });

	public render(): JSX.Element {
		return (
			<div className="login-overlay">
        <Header/>
				<form onSubmit={this.handleLogin} className='login-form'>
          <h3 className="title"> Login </h3>
					<div className="form-group">
						<label>Email address</label>
						<input
							type="text"
							className="form-control"
							id="_user_name"
							placeholder="Unicorn"
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
							aria-describedby="_pwdNote"
							onChange={this.setPassword}
						/>
						<small id="_pwdNote" className="form-text text-muted">
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
