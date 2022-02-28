
        
class Navbar extends React.Component 
{
	constructor(props) {
		super(props);
		this.get_cookie = this.get_cookie.bind(this);
		this.delete_cookie = this.delete_cookie.bind(this);
		this.change_view = this.change_view.bind(this);
		this.current_view=this.current_view.bind(this);
		this.handle_logout = this.handle_logout.bind(this);
		this.handle_ask_join = this.handle_ask_join.bind(this);
		this.componentDidMount=this.componentDidMount.bind(this);
		this.state = { LoggedAsAdmin:"False" };
	}
	
	

	componentDidMount(){
		if( this.get_cookie("email")===("admin@gmail.com"))
	   {

	   this.setState({LoggedAsAdmin:"True"});
	   }
	}
	change_view(){
		if (this.props.change_view) this.props.change_view();
	}

	async handle_ask_join()
	{
		
		const response = await fetch(`/api/messages/active/${this.get_cookie("id")}`,{
			method:"POST",
			headers:{"Content-Type":"application/json"}	}
		);
		if ( response.status != 200 )
		throw new Error( 'Error while asking to join' + response.text());
		else
		{
			alert("Activation message sent successfully.");
		}
		
	}
    
    get_cookie(token) {
		let name = token + "=";
		let decodedCookie = document.cookie;
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
		  let c = ca[i];
		  while (c.charAt(0) == ' ') {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		  }
		}
		return "";
	}

	delete_cookie() {
		document.cookie = 'token'+'=; Max-Age=-99999999;';
		document.cookie = 'email'+'=; Max-Age=-99999999;';
		document.cookie = 'password'+'=; Max-Age=-99999999;';
		document.cookie = 'expires'+'=; Max-Age=-99999999;';
	}


    async handle_logout()
	{
        const response = await fetch('/api/user/logout',{
			method:"POST",
			headers:{"Content-Type":"application/json","Authorization": `{"token":"${this.get_cookie("token")}"}`}	}
		);
		if ( response.status != 200 )
		throw new Error( 'Error while fetching posts' + response.text());
		this.delete_cookie();
		this.props.change_view("logIn");
		console.log("bye");

  }
	
	render() {
		return (
		  <section id="nav">
			{this.current_view()}
		  </section>
		)
	  }

	  current_view () 
	  {
	   switch(this.state.LoggedAsAdmin)
	    {
				case "False":
					return(
					<div class="nav">
						<div class="menu-text">
						<ul>
						<span class="navItem" onClick={ () => this.props.change_view("Home")}>Home</span>
						<span class="navItem" onClick={ () => this.props.change_view("Messages")}>Messages</span>
						<span class="navItem" onClick={ () => this.props.change_view("About")}>About</span>
						<span class="navItem" onClick={this.handle_ask_join}>Ask to join</span>
						<span class="navItem" onClick={this.handle_logout}>Logout</span>
					</ul>
				</div>
				</div>
				)
				break;
				case "True":
				
						return(
							<div class="nav">
						<ul>
							<span class="navItem" onClick={ () => this.props.change_view("Home")}>Home</span>
							<span class="navItem" onClick={ () => this.props.change_view("Messages")}>Messages</span>
							<span class="navItem" onClick={ () => this.props.change_view("Admin")}>Admin</span>
							<span class="navItem" onClick={ () => this.props.change_view("About")}>About</span>
							<span class="navItem" onClick={this.handle_logout}>Logout</span>
						</ul>
					</div>
					)
					break;

				}
				
	}
}
export default Navbar;