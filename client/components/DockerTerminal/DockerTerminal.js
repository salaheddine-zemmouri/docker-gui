import React from "react";
import axios from "../../lib/axios";
import "./DockerTerminal.module.css";

export default class DockerTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      loading: false,
      history: [],
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.params.id,
    });
  }

  render() {
    function exec(cmd) {
      axios
        .post("exec", {
          id: this.state.id,
          cmd,
        })
        .then((res) => {
          this.setState((state) => {
            let messages = state.messages;
            messages.push(res.data.message);
            return { loading: false, messages };
          });
        })
        .catch((err) => alert("ERROR"));
    }

    function onKeyUpHandler(e) {
      if (e.keyCode == 13) {
        let val = e.target.value;
        this.setState((state) => {
          const history = state.history;
          history.push(val);
          exec.call(this, val.split(" "));
          return {
            history,
            loading: true,
          };
        });
        e.target.value = "";
      }
    }

    return (
      <div className="container">
        <span className="command">
          {this.state.history.map((cmd, index) => (
            <span key={index} style={{ display: "block" }}>
              Docker-tty:/$
              <span style={{ fontWeight: 400 }}>
                {" " + cmd}
                <br />
                {this.state.messages[index]}
              </span>
            </span>
          ))}

          {!this.state.loading && (
            <div>
              Docker-tty:/$
              <input
                className="terminal-input"
                onKeyUp={onKeyUpHandler.bind(this)}
                type="text"
              />
            </div>
          )}
        </span>
      </div>
    );
  }
}
