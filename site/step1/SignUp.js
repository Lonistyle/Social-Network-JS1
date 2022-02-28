
class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.handleCreateUser = this.handleCreateUser.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = { name: "" ,password: "", email: ""}
	}



	handleChange(e) 
   {
    const name=e.target.id;
    const value = e.target.value;
    this.setState({[name]:value});
   }

   async handleCreateUser()
   {
    const name=this.state.name;
    const email=this.state.email;
    const password=this.state.password;
    const response = await fetch("/api/users",{
      method:"POST",
      body: JSON.stringify({
          name:name,
         email:email,
        password:password
      }),
      headers:{"Content-Type":"application/json"}
    })
    if(response.status === 200)
    {
      const id =(await response.json()).id;
      console.log(id);

      document.cookie = `id=${id}`;
      document.cookie = `name=${name}`;
      document.cookie = `email=${email}`;
      document.cookie = `password=${this.state.password}`;

        alert("User created successfully.");
    }
    else{
      alert(await response.text());
    }
    }

	render() {
		return( 
          <form>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label for="name">Full Name:</label>
                  <input value={this.state.name} onChange={this.handleChange} type="text" id="name" required/>
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input value={this.state.email} onChange={this.handleChange} type="text" id="email" required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input value={this.state.password} onChange={this.handleChange} type="text" id="password" required/>
                </li>
              </ul>
            </fieldset>
            <button type="button" onClick={this.handleCreateUser}>Submit</button>
            <button type="button" onClick={ () => this.props.changeView("logIn")}>Have an Account?</button>
          </form>
	)
        }
    }   

export default SignUp;