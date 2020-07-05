import React from 'react';
import { runInThisContext } from 'vm';
import { Router, Redirect } from 'react-router-dom';

export interface IRegisterProps {}

export interface IRegisterState {
	password: string | null;
	re_password: string | null;
	email: string | null;
	user_name: string | null;
}

export class Register extends React.Component<IRegisterProps, IRegisterState> {
	constructor(props: Readonly<IRegisterProps>) {
		super(props);
		this.state = {
			password: null,
			re_password: null,
			email: null,
			user_name: null,
		};
	}

	public handleSubmit = (event: any): JSX.Element => {
    //fetch() send to backend
    //localStorage.setItem('authToken', 'dslfj')
    event.preventDefault();
    return <Redirect to='/game'/>
	};

	public canSubmit = (): boolean =>
		this.state.password !== null &&
		this.state.re_password !== null &&
		this.state.password === this.state.re_password &&
		this.state.user_name !== null &&
		this.state.email !== null &&
		this.validateEmail(this.state.email) &&
		this.validatePassword(this.state.password);

	public validatePassword = (text: string): boolean =>
		new RegExp('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$').test(text) ? true : false;

	public validateEmail = (text: string): boolean => text.includes('@');

	public setEmail = (event: any) => this.setState({ email: event.target.value });

	public setPassword = (event: any) => this.setState({ password: event.target.value });

	public validateCorrectFirst = () =>
		this.state.password !== null
			? new RegExp('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$').test(this.state.password)
				? ''
				: 'Ya, your password have to contain minimum eight characters, at least one letter and one number'
			: '';

	public validateCorrectRepeate = () =>
		this.state.password !== null && this.state.re_password !== null
			? this.state.password === this.state.re_password
				? ''
				: this.state.password.includes(this.state.re_password)
				? ''
				: 'Sorry man but your passwords, doesnt match up'
      : '';
      
  public redirect = (): JSX.Element => {
    return <Redirect to='/login'/>
  }

	public render(): JSX.Element {
		return (
      <div className="register_overlay">
			<form onSubmit={this.handleSubmit}>
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
					<small id="_emailNote" className="form-text text-muted"></small>
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
					<small id="_pwd_note" className="form-text text-muted invalid-feedback">
						{this.validateCorrectFirst()}
					</small>
				</div>
				<div className="form-group">
					<label>Repeat Password</label>
					<input
						type="password"
						className="form-control"
						id="_re_password"
						placeholder="Password"
						onChange={this.setPassword}
					/>
					<small id="_re_pwd_note" className="form-text text-muted invalid-feedback">
						{this.validateCorrectRepeate()}
					</small>
				</div>
				<div className="form-group">
					<label>Nickname</label>
					<input
						type="text"
						className="form-control"
						id="_user_name"
						placeholder="Nickname"
						onChange={this.setPassword}
					/>
				</div>
				<button type="submit" className="btn btn-primary btn-lg" disabled={this.canSubmit()}>
					Send
				</button>
        <button type="button" className="btn btn-secondary" onClick={this.redirect}>
					Back
				</button>
			</form>
      </div>
		);
	}
}
