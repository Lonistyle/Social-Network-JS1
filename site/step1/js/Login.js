
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.change_view = this.change_view.bind(this);
		this.get_cookie = this.get_cookie.bind(this);
		this.set_cookie = this.set_cookie.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = { name: "", password: "", email: "" };
	}

	get_cookie(token) {
		let name = token + "=";
		let decodedCookie = document.cookie;
		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				console.log(c.substring(name.length, c.length));
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	handleLogin() {
		if (this.props.handleLogin) this.props.handleLogin();
	}

	change_view() {
		if (this.props.change_view) this.props.change_view();
	}

	async set_cookie(x) {
		const d = new Date();
		d.setTime(d.getTime() + 600);
		let expires = "expires=" + d.toUTCString();
		document.cookie = `token=${x.token}`;
		document.cookie = `expires=${d.toUTCString()}`;
		document.cookie = `email=${this.state.email}`;
		document.cookie = `password=${this.state.password}`;
	}
	async handleLogin() {
		const email = this.state.email;
		const password = this.state.password;
		const response = await fetch("/api/user/login", {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password
			}),
			headers: { "Content-Type": "application/json" }
		});
		if (response.status === 200) {
			const x = await response.json();
			this.set_cookie(x);
			this.props.change_view("Home");
		} else {
			alert((await response.text()));
		}
	}

	handleChange(e) {
		const name = e.target.id;
		const value = e.target.value;
		this.setState({ [name]: value });
	}

	render() {
		return React.createElement(
			"form",
			null,
			React.createElement(
				"h2",
				null,
				"Welcome Back!"
			),
			React.createElement(
				"fieldset",
				null,
				React.createElement(
					"legend",
					null,
					"Log In"
				),
				React.createElement(
					"ul",
					null,
					React.createElement(
						"li",
						null,
						React.createElement(
							"label",
							{ "for": "email" },
							"Email:"
						),
						React.createElement("input", { value: this.get_cookie("email") ? this.state.email = this.get_cookie("email") : this.state.email, onChange: this.handleChange,
							type: "text", id: "email", placeholder: this.get_cookie("email"), required: true })
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"label",
							{ "for": "password" },
							"Password:"
						),
						React.createElement("input", { value: this.get_cookie("password") ? this.state.password = this.get_cookie("password") : this.state.password, onChange: this.handleChange,
							type: "password", id: "password", required: true })
					)
				)
			),
			React.createElement(
				"button",
				{ type: "button", onClick: this.handleLogin },
				"Login"
			),
			React.createElement(
				"button",
				{ type: "button", onClick: () => this.props.change_view("signUp") },
				"Create an Account"
			)
		);
	}
}
export default Login;