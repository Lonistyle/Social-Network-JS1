
class About extends React.Component {
    render() {
        return React.createElement(
            "div",
            { "class": "creators" },
            "About the creators",
            React.createElement(
                "div",
                { "class": "creator" },
                React.createElement(
                    "span",
                    null,
                    "Lonnie Berry"
                ),
                React.createElement(
                    "span",
                    null,
                    "lonniebe@mta.ac.il"
                )
            )
        );
    }
}
export default About;