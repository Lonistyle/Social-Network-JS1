import Post from './Post.js';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.get_cookie = this.get_cookie.bind(this);
		this.fetch_posts = this.fetch_posts.bind(this);
		this.fetch_version = this.fetch_version.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.new_post = this.new_post.bind(this);
		this.update_list = this.update_list.bind(this);
		this.check_new_posts=this.check_new_posts.bind(this);
		this.refresh_posts=this.refresh_posts.bind(this);
		this.update_posts_states=this.update_posts_states.bind(this);
		this.state = { posts: [],ButtonText:"No new posts",newPosts: false, token:"", text:"", buttonStyle: { backgroundColor:'#5885a96e' }, intervalId: '' }
	}
	
	handleChange(e) 
   {
    this.setState({[e.target.id]:e.target.value});
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
			console.log(c.substring(name.length, c.length));
			return c.substring(name.length, c.length);
		  }
		}
		return "";
	}





	async componentDidMount() 
	{
		console.log("Home:"+this.get_cookie("token"));
		const posts = await this.fetch_posts();
		this.update_list(posts);
		this.state.intervalId = setInterval(this.check_new_posts, 2500);
	}

	async componentWillUnmount()
    {
        clearInterval(this.state.intervalId);
    }

	async fetch_posts()
	{
		const response = await fetch('/api/posts',{
			method:"GET",
			headers:{"Content-Type":"application/json","Authorization": `{"token":"${this.get_cookie("token")}"}`}	}
		);
		if ( response.status != 200 )
		{
			alert("Error while fetching posts " + await response.text());
			throw new Error( 'Error while fetching posts' + response.text());

		}
		const data = await response.json();
		return data;
		
	}
	
	

	async new_post()
	{
		const text= this.state.text;
		const response = await fetch('/api/posts',{
			method:"POST",
			body: JSON.stringify({
				text:text}),
			headers:{"Content-Type":"application/json","Authorization": `{"token":"${this.get_cookie("token")}"}`}	}
		);
		if ( response.status != 200 )
		{
			alert("Error while fetching posts " + await response.text());
			throw new Error( 'Error while fetching posts' + response.text());

		}

		const posts = await this.fetch_posts();
		this.setState( {posts : posts} );
	}
	
	async fetch_user()
	{
		const response = await fetch('/api/user/1',{
			method:"GET",
			headers:{"Content-Type":"application/json"}	}
		);
		if ( response.status != 200 )
		throw new Error( 'Error while fetching posts' + response.text());
		
		const data = await response.json();
		return data;
		
	}
  
	async fetch_version(){
		const response = await fetch('/api/version',{
			method:"GET",
			headers:{"Content-Type":"application/json"}	}
		);
		if ( response.status != 200 )
		throw new Error( 'Error while fetching posts' + response.text());
		
		const data = await response.json();
		return data;
	}

	update_list( posts )
	{
		this.setState( { posts : posts} );
	}


	async refresh_posts()
    {        
        if(this.state.newPosts == false)
        {
            window.alert("No new posts");
        }
        else
        {
            const posts = await this.fetch_posts();
            this.update_posts_states(posts);
        }        
    }

	update_posts_states( inPosts )
    {  

        this.setState({ 
            posts : inPosts ,  
            newPosts: false ,
			ButtonText:"No new posts",
           buttonStyle:{backgroundColor : '#5885a96e'}});                       
    }


    async check_new_posts()
    {
        const newPosts = await this.fetch_posts();   //for debug
        if(newPosts.length > this.state.posts.length)
        {
            this.setState({newPosts:true,ButtonText:"New posts !", buttonStyle:{backgroundColor : '#a34d4d'} });                    
        }
        else
        {
            this.setState({newPosts:false,ButtonText:"No new posts", buttonStyle:{backgroundColor : '#5885a96e'}});            
        }
    }

	render() 
    {
		return( 
            <form>
				<input value={this.state.text} onChange={this.handleChange} placeholder="what's on you'r mind..." type="text" id="text"/>
				<button type="button" onClick={this.new_post}>post</button>
				<div className="Posts_refresher">
				<button type="button" onClick={this.refresh_posts} style={this.state.buttonStyle}>{this.state.ButtonText}</button>
				</div>
				<div class="posts">Posts:
			   {this.state.posts.slice(0, 3).map( (item,index)  => { return  <Post class="form"post={item} key={index}/> })}
			   </div>
            </form>
	)
 }
}
export default Home;

