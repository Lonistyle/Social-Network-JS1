
class Post extends React.Component 
{
	constructor(props) {
		super(props);
		this.state={line_break:", "}
	}

	render() {
		return 	(
		<div className='Post'>
			<blockquote>
				<span class="postInfo">
					<i class="fa-solid fa-thumbtack">						
					</i>
				</span>
				<p>
					<q>{this.props.post.text}</q>
				</p>
				<footer>
					Posted by: User {this.props.post.creator_id}{this.state.line_break}{this.props.post.creation_date}
				</footer>
	  		</blockquote>
	  	</div>)
	  
	}
}
export default Post;