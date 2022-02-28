
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { name: "", password: "", email: "" };
  }

  handleChange(e) {
    const name = e.target.id;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  async handleCreateUser() {
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
      headers: { "Content-Type": "application/json" }
    });
    if (response.status === 200) {
      const id = (await response.json()).id;
      console.log(id);

      document.cookie = `id=${id}`;
      document.cookie = `name=${name}`;
      document.cookie = `email=${email}`;
      document.cookie = `password=${this.state.password}`;

      alert("User created successfully.");
    } else {
      alert((await response.text()));
    }
  }

  render() {
    return React.createElement(
      "form",
      null,
      React.createElement(
        "h2",
        null,
        "Sign Up!"
      ),
      React.createElement(
        "fieldset",
        null,
        React.createElement(
          "legend",
          null,
          "Create Account"
        ),
        React.createElement(
          "ul",
          null,
          React.createElement(
            "li",
            null,
            React.createElement(
              "label",
              { "for": "name" },
              "Full Name:"
            ),
            React.createElement("input", { value: this.state.name, onChange: this.handleChange, type: "text", id: "name", required: true })
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "label",
              { "for": "email" },
              "Email:"
            ),
            React.createElement("input", { value: this.state.email, onChange: this.handleChange, type: "text", id: "email", required: true })
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "label",
              { "for": "password" },
              "Password:"
            ),
            React.createElement("input", { value: this.state.password, onChange: this.handleChange, type: "text", id: "password", required: true })
          )
        )
      ),
      React.createElement(
        "button",
        { type: "button", onClick: this.handleCreateUser },
        "Submit"
      ),
      React.createElement(
        "button",
        { type: "button", onClick: () => this.props.changeView("logIn") },
        "Have an Account?"
      )
    );
  }
}

export default SignUp;