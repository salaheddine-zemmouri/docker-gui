import React from 'react'
import {styles} from './ContainerStats.style'
import containerSVG from '../../assets/png/container.png'
import cpuSVG from '../../assets/png/cpu.png'
import memorySVG from '../../assets/png/memory.png'
import MetricCard from './MetricCard'
import ContainerMetricChartView from './ContainerMetricChartView'
import axios from 'axios'
import {Link} from 'react-router'


export default class ContainerStat extends React.Component {
  constructor() {
    super()
    this.state = { 
      isTableBtnActive: true, 
      totalCpuUsage : 0, 
      totalMemoryUsage: 0,
      containers : [] 
    }
  }

  componentDidMount() {
    axios
    .get('http://localhost:3000/container-stats')
    .then(res => this.setState(
      {
        totalCpuUsage: res.data.total_cpu_usage.toFixed(2), 
        totalMemoryUsage : res.data.total_memory_usage.toFixed(2),
        containers : res.data.containers_states
      }))
  }

  toggleContainerListView(targetBtn) {
    if (
      (this.state.isTableBtnActive && targetBtn !== 'list') ||
      (!this.state.isTableBtnActive && targetBtn !== 'stats')
    ) {
      this.setState((state) => ({
        isTableBtnActive: !state.isTableBtnActive,
      }))
    }
  }

  getBtnGroupClassName(isActive) {
    return isActive ? 'btn-primary' : 'btn-default'
  }

  render() {
    return (
      <div className='containers-stats' style={{padding: '64px'}}>
        <div style={styles.flex_wrapper}>
          <MetricCard
            icon={containerSVG}
            title='Number of contianers'
            value={this.state.containers.length}
          />
          <MetricCard
            icon={cpuSVG}
            title='Total CPU usage'
            value={`${this.state.totalCpuUsage} %`}
          />
          <MetricCard
            icon={memorySVG}
            title='Total Memory usage'
            value={`${this.state.totalMemoryUsage} %`}
          />
        </div>

        <div style={styles.table_actions}>
          <div
            style={styles.table_toggle_view} className='btn-group'
            role='group'
            aria-label='...'
          >
            <button
              id='list'
              type='button'
              className={`btn ${this.getBtnGroupClassName(
                this.state.isTableBtnActive
              )}`}
              onClick={this.toggleContainerListView.bind(this, 'list')}
            >
              <span               
                className='glyphicon glyphicon-th-list'
                aria-hidden='true'
              ></span>
            </button>
            <button
              id='stats'
              type='button'
              className={`btn ${this.getBtnGroupClassName(
                !this.state.isTableBtnActive
              )}`}
              onClick={this.toggleContainerListView.bind(this, 'stats')}
            >
              <span
                className='glyphicon glyphicon-stats'
                aria-hidden='true'
              ></span>
            </button>
          </div>

          <button type='button' className='btn btn-primary'>
            Refresh
          </button>
        </div>
        {this.state.isTableBtnActive ? (
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Container ID</th>
                  <th>Metrics</th>
                  <th>Stats</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.containers.map(container => 
                  <tr key={container.container_id}>
                  <td>{container.container_id.substring(0,8)}</td>
                  <td>
                    <span className='label label-default' style={styles.label}>
                      CPU : {container.cpu_usage.toFixed(2)} %
                    </span>
                    <span className='label label-default' style={styles.label}>
                      MEM : {container.memory_usage.toFixed(2)} %
                    </span>
                  </td>
                  <td>
                    <Link to={`/container-stats/${container.container_id}`}>Detailed statistics</Link>
                  </td>
                </tr>  
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div><ContainerMetricChartView 
            containers={this.state.containers} 
            totalCpuUsage={this.state.totalCpuUsage} 
            totalMemoryUsage={this.state.totalMemoryUsage}
          /></div>
        )}
      </div>
    )
  }
}
