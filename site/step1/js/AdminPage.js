
class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.update_user = this.update_user.bind(this);
        this.get_cookie = this.get_cookie.bind(this);
        this.send_messages_to_all = this.send_messages_to_all.bind(this);
        this.state = { Message_To_All: "", Id_To_Update: "", Chosen_Status: "" };
    }

    get_cookie() {
        let name = "token" + "=";
        let decodedCookie = document.cookie;
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                console.log("app: get cookie");
                console.log(c.substring(name.length, c.length));
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    async update_user() {
        const response = await fetch(`/api/user/state/${this.state.Id_To_Update}`, {
            body: JSON.stringify({ status: this.state.Chosen_Status }),
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `{"token":"${this.get_cookie("token")}"}` } });

        if (response.status != 200) {
            alert("Error while fetching posts " + (await response.text()));
            throw new Error('Cannot update user ' + response.text());
        } else {
            alert("User Updated successfully.");
        }
    }
    async send_messages_to_all() {
        const response = await fetch('/api/messages', {
            body: JSON.stringify({ text: this.state.Message_To_All }),
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `{"token":"${this.get_cookie("token")}"}` }
        });

        if (response.status == 200) {
            alert((await response.json()));
        } else {
            alert("Error: " + (await response.text()));
        }
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return React.createElement(
            "form",
            null,
            React.createElement(
                "div",
                { "class": "creator" },
                React.createElement(
                    "h3",
                    null,
                    "Send Message To All Users:"
                ),
                React.createElement("br", null),
                React.createElement(
                    "label",
                    null,
                    "Message :"
                ),
                React.createElement("input", { value: this.state.Message_To_All, onChange: this.handleChange, placeholder: "", type: "text", id: "Message_To_All" }),
                React.createElement(
                    "button",
                    { type: "button", onChange: this.handleChange, onClick: this.send_messages_to_all },
                    "Send"
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            ),
            React.createElement(
                "div",
                { "class": "creator" },
                React.createElement(
                    "h3",
                    null,
                    "Update User:"
                ),
                React.createElement("br", null),
                React.createElement(
                    "label",
                    null,
                    "User ID :"
                ),
                React.createElement("input", { value: this.state.Id_To_Update, onChange: this.handleChange, type: "text", id: "Id_To_Update" }),
                React.createElement(
                    "select",
                    { onChange: this.handleChange, name: "Status", id: "Chosen_Status" },
                    React.createElement(
                        "option",
                        { value: "none", selected: true, disabled: true, hidden: true },
                        "Select an Option"
                    ),
                    React.createElement(
                        "option",
                        { value: "approve" },
                        "approve"
                    ),
                    React.createElement(
                        "option",
                        { value: "restore" },
                        "restore"
                    ),
                    React.createElement(
                        "option",
                        { value: "suspend" },
                        "suspend"
                    )
                ),
                React.createElement(
                    "button",
                    { type: "button", onClick: this.update_user },
                    "Update"
                )
            )
        );
    }
}
export default AdminPage;