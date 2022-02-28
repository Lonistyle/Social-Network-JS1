import Login from './Login.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import Messages from './Messages.js';
import Navbar from './Navbar.js';
import About from './About.js';
import AdminPage from './AdminPage.js';


class EntryPage extends React.Component {
  constructor(props){
    super(props)
    this.change_view = this.change_view.bind( this );
    this.current_view = this.current_view.bind( this );
    this.state = {current_view: "logIn",token:""};
  }

  change_view(view) {this.setState({current_view: view})}



  current_view () 
   {
    switch(this.state.current_view) {
      case "signUp":
        return ( <SignUp change_view={this.change_view}  />)
        break;
      case "logIn":
        return ( <Login change_view={this.change_view} />)
        break;
      case "Home":
        return ( 
          <div class="container">
            <Navbar change_view={this.change_view} />
            <div class="home-container">
              <Home change_token={this.change_token}/>
            </div>
          </div>
        )   
        break;  
      case "Messages":
      return ( 
        <div class="container">
          <Navbar change_view={this.change_view} />
          <div class="home-container">
            <Messages change_token={this.change_token}/>
          </div>
        </div>
      )   
      break; 
      case "About":
        return ( 
          <div class="container">
            <Navbar change_view={this.change_view} />
            <div class="home-container">
              <About/>
            </div>
          </div>
        )   
        break;  
        case "Admin":
        return ( 
          <div class="container">
            <Navbar change_view={this.change_view} />
            <div class="home-container">
              <AdminPage/>
            </div>
          </div>
        )     
      default:
        break
    }
  }

  render() {
    return (
      <section id="entry-page">
        {this.current_view()}
      </section>
    )
  }

  

}

ReactDOM.render(<EntryPage/>, document.getElementById("app"))