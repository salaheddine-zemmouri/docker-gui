import {inject, observer} from 'mobx-react'
import React from 'react'
import AppStore from 'stores/AppStore'

@inject('store')
@observer
export default class Logs extends React.Component {
  props: {
    store: AppStore;
  }

  constructor(props) {
    super(props)

    this.appStore = props.store
    this.containersStore = this.appStore.containers
  }

  componentDidMount() {
    this.loadContainers()
  }

  getContainerLogs = id => {
    this.logs =  this.containersStore.loadContainersLogs(id)
  }

  
  render() {
    const containerId = new URLSearchParams(window.location.search).get('containerId')
    console.log(containerId)
    return (
      <div className="Logs">
        <div className="table-responsive">
          <h1>Container {containerId} Logs</h1>
          <table className="table">
            <thead>
            <tr>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
