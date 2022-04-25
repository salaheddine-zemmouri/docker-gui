import {inject, observer} from 'mobx-react'
import React from 'react'
import AppStore from 'stores/AppStore'
import Ansi from 'ansi-to-react'

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
    this.containerId = new URLSearchParams(window.location.search).get('containerId')
    this.containersStore.loadContainersLogs(this.containerId)
  }
  componentWillUnmount() {
    this.containersStore.inspect = null
  }
  
  render() {
    const { inspect } = this.containersStore
    const lines = inspect ? inspect.message.split('\n') : null
    return (
      <div className="Logs">
          <h1>Container {this.containerId} Logs</h1>
          {lines ? lines.map((line,idx) => <div key={idx}><Ansi>{line}</Ansi><br/></div>) : null}
      </div>
    )
  }
}
