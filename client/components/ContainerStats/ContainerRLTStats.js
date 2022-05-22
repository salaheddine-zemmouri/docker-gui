import React from "react";
import { Line } from "react-chartjs-2";
import axios from "../../lib/axios";

export default class ContainerRLTStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRefreshRate: 5,
      selectedContainerID: undefined,
      labels: [],
      cpuUsage: [],
      memUsage: [],
    };
  }

  componentDidUpdate() {
    axios
      .get(`/container_stats/${this.state.selectedContainerID}`)
      .then((res) =>
        this.setState((state) => {
          const labels = state.labels;
          labels.push(new Date());
          const cpuUsage = state.cpuUsage;
          const memUsage = state.memUsage;

          cpuUsage.push(res.data.cpu_usage);
          memUsage.push(res.data.memory_usage);
        })
      );
  }

  updateSelectedRefreshRate(e) {
    let newRefreshRate = parseInt(e.target.id);
    this.setState({ selectedRefreshRate: newRefreshRate });
  }

  updateSelectedContainerID(e) {
    let containerId = e.target.id;

    this.setState({ selectedContainerID: containerId });
  }

  render() {
    return (
      <div className="container-RLT-stats">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Parameters</h3>
          </div>
          <div className="panel-body">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-default dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Refresh rate <span className="caret"></span>
              </button>

              <ul className="dropdown-menu">
                <li onClick={this.updateSelectedRefreshRate.bind(this)}>
                  <a id="1" href="#">
                    1s
                  </a>
                </li>
                <li onClick={this.updateSelectedRefreshRate.bind(this)}>
                  <a id="3" href="#">
                    3s
                  </a>
                </li>
                <li onClick={this.updateSelectedRefreshRate.bind(this)}>
                  <a id="5" href="#">
                    5s
                  </a>
                </li>
                <li onClick={this.updateSelectedRefreshRate.bind(this)}>
                  <a id="10" href="#">
                    10s
                  </a>
                </li>
                <li onClick={this.updateSelectedRefreshRate.bind(this)}>
                  <a id="30" href="#">
                    30s
                  </a>
                </li>
                <li onClick={this.updateSelectedRefreshRate.bind(this)}>
                  <a id="60" href="#">
                    60s
                  </a>
                </li>
              </ul>
            </div>
            <span style={{ marginLeft: "8px" }}>
              {this.state.selectedRefreshRate} s
            </span>
          </div>

          <div className="panel-body">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-default dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Container ID <span className="caret"></span>
              </button>

              <ul className="dropdown-menu">
                {this.props.containers.map((container, index) => {
                  return (
                    <li
                      key={index}
                      onClick={this.updateSelectedContainerID.bind(this)}
                    >
                      <a id={container.container_id} href="#">
                        {container.container_id.substring(0, 8)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <span style={{ marginLeft: "8px" }}>
              {this.state.selectedContainerID && this.state.selectedContainerID}
            </span>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">CPU usage</h3>
          </div>
          <div className="panel-body">
            <Line
              width={5}
              height={2}
              data={{
                labels: this.state.labels,
                datasets: [
                  {
                    label: "",
                    data: this.state.cpuUsage,
                    borderColor: "#e84118",
                    backgroundColor: "#c23616",
                  },
                ],
              }}
            />
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Memory usage</h3>
          </div>
          <div className="panel-body">
            <Line
              width={5}
              height={2}
              data={{
                labels: this.state.labels,
                datasets: [
                  {
                    label: "",
                    data: this.state.cpuUsage,
                    borderColor: "#e84118",
                    backgroundColor: "#c23616",
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
