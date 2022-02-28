
class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = { line_break: ", " };
	}

	render() {
		return React.createElement(
			"div",
			{ className: "Post" },
			React.createElement(
				"blockquote",
				null,
				React.createElement(
					"span",
					{ "class": "postInfo" },
					React.createElement("i", { "class": "fa-solid fa-thumbtack" })
				),
				React.createElement(
					"p",
					null,
					React.createElement(
						"q",
						null,
						this.props.post.text
					)
				),
				React.createElement(
					"footer",
					null,
					"Posted by: User ",
					this.props.post.creator_id,
					this.state.line_break,
					this.props.post.creation_date
				)
			)
		);
	}
}
export default Post;