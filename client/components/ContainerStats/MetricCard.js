import React from "react";
import { styles } from "./MetricCard.style";

export default class MetricCard extends React.Component {
  render() {
    return (
      <div style={styles.flex_card}>
        <span style={styles.grid_item_title}>{this.props.title}</span>
        <span style={styles.grid_item_value}>{this.props.value}</span>
      </div>
    );
  }
}
