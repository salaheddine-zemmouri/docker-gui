import React from 'react'
import {styles} from './MetricCard.style'

export default class MetricCard extends React.Component {
  render() {
    return (
      <div style={styles.flex_card}>
        {/*<div style={styles.grid_item_icon}>
          <img src={this.props.icon} alt={this.props.title} width='64px' />
    </div>*/}

        <span style={styles.grid_item_title}>{this.props.title}</span>

        <span style={styles.grid_item_value}>{this.props.value}</span>
      </div>
    )
  }
}
