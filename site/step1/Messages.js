
import Message from './Message.js';


class Messages extends React.Component {
     
    
    constructor(props)
    {
        super(props)
        this.update_messages_state = this.update_messages_state.bind(this);
        this.get_cookie = this.get_cookie.bind(this);
        this.map_messages = this.map_messages.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.new_message = this.new_message.bind(this);
        this.refresh_messages = this.refresh_messages.bind(this);
        this.check_new_messages = this.check_new_messages.bind(this);
        this.state = { messages : [] , currMessageCount : 0 , newMessages: false, buttonText : '!' , buttonStyle: { backgroundColor:'#5885a96e' }, intervalId: '' };
    }
    
    render(){
        return(
        <div class="messages">Messages
        <form class="messagesForm">
            <div class="sendNewMessage">                
                <textarea class="messageTextInput" value={this.state.text} onChange={this.handleChange} placeholder="message" type="text" id="text" />                                    
                <div class="sendNewMessageButtons">
                    <input type ="number" id="inputId" min="1" placeholder="Recipient's user ID"/>            
                    <button type="button" onClick={this.new_message}>Send Message</button>
                    <button type="button" onClick={this.refresh_messages} style={this.state.buttonStyle}>{this.state.buttonText}</button>
                </div>
             </div>            			
            {this.map_messages()}
        </form>
        </div>        
        )
    }

    async refresh_messages()
    {        
        if(this.state.newMessages == false)
        {
            window.alert("No new messages");
        }
        else
        {
            const messages = await this.fetch_messages();
            this.update_messages_state(messages);
        }        
    }

    async check_new_messages()
    {
        const newMessages = await this.fetch_messages();
        console.log("check_new_messages: ",newMessages,newMessages.length);     //for debug
        if(newMessages.length > this.state.messages.length)
        {
            const delta = newMessages.length - this.state.messages.length;
            this.setState({newMessages:true , buttonText : `${delta}` , buttonStyle:{backgroundColor : '#a34d4d'} });                    
        }
        else
        {
            this.setState({newMessages:false,  buttonText : '!' , buttonStyle:{backgroundColor : '#5885a96e'}});            
        }
    }

    handleChange(e) 
    {
        this.setState({[e.target.id]:e.target.value});
    }

    async new_message()
    {
        const text = this.state.text;
        const id = document.getElementById('inputId').value;
        if(!text)
        {
            window.alert("Message Box is empty");
            return;
        }
        if(!id)
        {
            window.alert("Specify recipient ID");
            return;
        }

        if(window.confirm("Are You sure you want to send a message?"))
        {
            const apiReqString = `/api/message/${id}`;

            const response = await fetch(apiReqString,{
                method:"POST",
                body: JSON.stringify({
                    text:text
                }),
                headers:{"Content-Type":"application/json","Authorization": `{"token":"${this.get_cookie("token")}"}`}	}
            );

            if ( response.status != 200 ){
                throw new Error( 'Error while fetching posts' + response.json());
            }
            
            const data = await response.json();
            console.log("fetch_messages data:",data);
                       
            window.alert("Message Sent");
            return;
        }
    }
    
    map_messages()
    {
        let amoutOfMessages = 3;

        const mappedMessages = this.state.messages.slice(0,amoutOfMessages).map((message,index)=> {
            return <Message class="form" message={message} key={index} /> 
        });

        if(mappedMessages.length == 0)
        {
            const msg = { text: "No Messages to display"};
            const emptyMsg = <Message class="form" message={msg} key={0} />;
            mappedMessages.push(emptyMsg);
        }

        return mappedMessages;
    }

    get_cookie(token) 
    {
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

    async componentDidMount()
    {
        const messages = await this.fetch_messages();                
        this.update_messages_state(messages);
        this.state.intervalId = setInterval(this.check_new_messages, 2500);
    }

    async componentWillUnmount()
    {
        clearInterval(this.state.intervalId);
    }

    update_messages_state( inMessages )
    {  

        const messagesCount = inMessages.length;

        this.setState({ 
            messages : inMessages , 
            currMessageCount : messagesCount , 
            newMessages: false ,
            buttonText : '!' , buttonStyle:{backgroundColor : '#5885a96e'}});                       
    }

    async fetch_messages()
    {
        const id = await this.fetch_user_id();
       
        const apiReqString = `/api/messages/${id}`;

        const response = await fetch(apiReqString,{
			method:"GET",
			headers:{"Content-Type":"application/json","Authorization": `{"token":"${this.get_cookie("token")}"}`}	}
		);

        if ( response.status != 200 ){
            throw new Error( 'Error while fetching posts' + response.json());
        }
		
        const data = await response.json();        
       
        return data;
    }

    async fetch_user_id()
    {
        const email = this.get_cookie("email");
        const apiReqString = `/api/useremail/${email}`;

        const response = await fetch(apiReqString,{
			method:"GET",
			headers:{"Content-Type":"application/json","Authorization": `{"token":"${this.get_cookie("token")}"}`}	}
		);
        
        const id = await response.json();

        
        return id;
    }
}
export default Messages;


