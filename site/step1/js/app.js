import Login from './Login.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import Messages from './Messages.js';
import Navbar from './Navbar.js';
import About from './About.js';
import AdminPage from './AdminPage.js';

class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.change_view = this.change_view.bind(this);
    this.current_view = this.current_view.bind(this);
    this.state = { current_view: "logIn", token: "" };
  }

  change_view(view) {
    this.setState({ current_view: view });
  }

  current_view() {
    switch (this.state.current_view) {
      case "signUp":
        return React.createElement(SignUp, { change_view: this.change_view });
        break;
      case "logIn":
        return React.createElement(Login, { change_view: this.change_view });
        break;
      case "Home":
        return React.createElement(
          'div',
          { 'class': 'container' },
          React.createElement(Navbar, { change_view: this.change_view }),
          React.createElement(
            'div',
            { 'class': 'home-container' },
            React.createElement(Home, { change_token: this.change_token })
          )
        );
        break;
      case "Messages":
        return React.createElement(
          'div',
          { 'class': 'container' },
          React.createElement(Navbar, { change_view: this.change_view }),
          React.createElement(
            'div',
            { 'class': 'home-container' },
            React.createElement(Messages, { change_token: this.change_token })
          )
        );
        break;
      case "About":
        return React.createElement(
          'div',
          { 'class': 'container' },
          React.createElement(Navbar, { change_view: this.change_view }),
          React.createElement(
            'div',
            { 'class': 'home-container' },
            React.createElement(About, null)
          )
        );
        break;
      case "Admin":
        return React.createElement(
          'div',
          { 'class': 'container' },
          React.createElement(Navbar, { change_view: this.change_view }),
          React.createElement(
            'div',
            { 'class': 'home-container' },
            React.createElement(AdminPage, null)
          )
        );
      default:
        break;
    }
  }

  render() {
    return React.createElement(
      'section',
      { id: 'entry-page' },
      this.current_view()
    );
  }

}

ReactDOM.render(React.createElement(EntryPage, null), document.getElementById("app"));