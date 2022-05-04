import React from "react";

export default class DockerfileGenUsage extends React.Component {
  render() {
    return (
      <div>
        <h4>How to use Dockerfile generator</h4>
        <p>
          - press <kbd>alt + ;</kbd> to delete the last stage.
          <br />- press <kbd>alt + :</kbd> to delete the last instruction in the
          last stage.
          <br />- press <kbd>esc</kbd> to abort all.
          <br />
        </p>
      </div>
    );
  }
}
