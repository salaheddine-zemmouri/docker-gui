
import React from "react";
import { styles } from "./DockerFileGen.style";

export default class DockerfileBaseImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-group">
        <label>From</label>
        <input
          style={styles.my_4}
          type="text"
          className="form-control"
          placeholder="platform"
          name="platform"
          onChange={this.props.onChange}
          autoComplete="off"
        />
        <input
          style={styles.my_4}
          type="text"
          className="form-control"
          placeholder="image"
          name="image"
          required
          onChange={this.props.onChange}
          autoComplete="off"
        />
        <span style={styles.tag_separator}>:</span>
        <input
          style={styles.my_4}
          type="text"
          className="form-control"
          placeholder="tag"
          name="tag"
          onChange={this.props.onChange}
          autoComplete="off"
        />
        <span>AS</span>
        <input
          style={styles.my_4}
          type="text"
          className="form-control"
          placeholder="name"
          name="as"
          onChange={this.props.onChange}
          autoComplete="off"
        />
      </div>
    );
  }
}
