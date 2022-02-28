
class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "div",
            { className: "Message", "data-id": this.props.message.id },
            React.createElement(
                "span",
                { "class": "msgInfo" },
                React.createElement("i", { "class": "fa-solid fa-thumbtack" }),
                React.createElement(
                    "p",
                    null,
                    this.props.message.text
                ),
                React.createElement(
                    "blockquote",
                    null,
                    React.createElement(
                        "footer",
                        null,
                        React.createElement("br", null),
                        "sent from: ",
                        this.props.message.sender_id,
                        React.createElement("br", null),
                        "on: ",
                        this.props.message.creation_date
                    )
                )
            )
        );
    }
}

export default Message;