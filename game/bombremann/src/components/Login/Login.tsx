import React from 'react';
import './Login.scss'
import { Header } from '../Header/Header';
import { getAuthToken, setAuthToken } from '../../modules/auth-token';

export interface ILoginProps {}

export interface ILoginState {
	password: string | null;
	email: string | null;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
	constructor(props: Readonly<ILoginProps>) {
		super(props);
		this.state = {
			password: null,
			email: null,
		};
	}

	componentDidMount = () => {
		const token = getAuthToken();
		if (token) {
			// sende an router
			// if router ok
      
      (this.props as any).history.push('/game');
		}
  };
  
  public handleSubmit = async (event: any): Promise<void> => {
    //fetch() send over router to backend
    // get token
    //setAuthToken('sfsdf') to router
		event.preventDefault();
		// set connection strings to localstorage
    (this.props as any).history.push('/game');
	};

	public redirect = (): void => {
		(this.props as any).history.push('/register');
	};

	public canSubmit = (): boolean =>
		this.state.password !== null &&
		this.state.email !== null &&
		this.validateEmail(this.state.email) &&
		this.validatePassword(this.state.password);

	public validatePassword = (text: string): boolean =>
		new RegExp('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$').test(text) ? true : false;

	public validateEmail = (text: string): boolean => text.includes('@');

	public setEmail = (event: any) => this.setState({ email: event.target.value });

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
							type="email"
							className="form-control"
							id="_email"
							aria-describedby="_emailNote"
							placeholder="test@fun.org"
							onChange={this.setEmail}
						/>
						<small id="_emailNote" className="form-text text-muted">
							Don't worry, Google has it already
						</small>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							className="form-control"
							id="_password"
							placeholder="VeryStrongPassword"
							onChange={this.setPassword}
						/>
					</div>
					<button type="submit" className="btn btn-primary btn-lg custom-btn" disabled={this.canSubmit()}>
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
