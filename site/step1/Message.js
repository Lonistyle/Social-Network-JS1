
class Message extends React.Component 
{
	constructor(props) {
		super(props);
	}

	render() {
		return(
        <div className='Message'  data-id={this.props.message.id}>
            
        <span class="msgInfo">
                <i class="fa-solid fa-thumbtack">                    
                </i>                
                <p>
                    {this.props.message.text}
                </p>
            <blockquote>   
                <footer>
                    <br/>
                    sent from: {this.props.message.sender_id} 
                    <br/>
                    on: {this.props.message.creation_date}
                </footer>
                
            </blockquote>
        </span>
        </div>)
    }
}


export default Message;