import React from "react";
import { styles } from "./DockerFileGen.style";

export default class DockerfileInstruction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.instruction_wrapper} className="form-group">
        <select
          className="form-control"
          name="type"
          onChange={this.props.onChange}
          required
        >
          <option></option>
          <option>EXPOSE</option>
          <option>VOLUME</option>
          <option>WORKDIR</option>
          <option>USER</option>
          <option>ENV</option>
          <option>COPY</option>
          <option>CMD</option>
          <option>ENTRYPOINT</option>
          <option>RUN</option>
        </select>
        <input
          style={{ ...styles.ml_8, minWidth: "50%" }}
          type="text"
          className="form-control"
          placeholder="parameters"
          name="params"
          autoComplete="off"
          required
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
