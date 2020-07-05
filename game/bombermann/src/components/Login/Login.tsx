import React from 'react';

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
			<form>
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
						Keine Sorge wir, Google hat die eh schon.
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
				<button type="submit" className="btn btn-primary" disabled={this.canSubmit()}>
					Login
				</button>
			</form>
		);
	}
}
