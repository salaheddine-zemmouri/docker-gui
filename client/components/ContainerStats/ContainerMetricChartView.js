import React from "react";
import { Pie } from "react-chartjs-2";
import { styles } from "./ContainerMetricChartView.style";
import { hexColorGenerator } from "./utils.js";

const cpuData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      borderWidth: 1,
    },
  ],
};

const cpuOption = {
  responsive: true,
  plugins: {
    legend: {
      position: "left",
    },
    title: {
      display: true,
      text: "CPU usage distribution",
    },
  },
};
const memoryData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
      borderWidth: 1,
    },
  ],
};

const memoryOption = {
  responsive: true,
  plugins: {
    legend: {
      position: "left",
    },
    title: {
      display: true,
      text: "Memory usage distribution",
    },
  },
};

export default class ContainerMetricChartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    const backgroundColors = hexColorGenerator(this.state.containers.length);
    cpuData.labels = this.state.containers.map(
      (container) => container.container_name
    );
    cpuData.datasets[0].data = this.state.containers.map(
      (container) => container.cpu_usage && 0
    );
    cpuData.datasets[0].backgroundColor = backgroundColors;

    memoryData.labels = cpuData.labels;
    memoryData.datasets[0].data = this.state.containers.map(
      (container) => container.memory_usage && 0
    );
    memoryData.datasets[0].backgroundColor = backgroundColors;
  }

  render() {
    return (
      <div style={styles.flex_wrapper}>
        <div>
          <h3>Container distribution by cpu usage</h3>
          <Pie options={cpuOption} data={cpuData} />
        </div>
        <div>
          <h3>Container distribution by memory usage</h3>
          <Pie options={memoryOption} data={memoryData} />
        </div>
      </div>
    );
  }
}
