import { instances } from "chart.js";
import { inject } from "mobx-react";
import React from "react";
import { Link } from "react-router";
import AppStore from "stores/AppStore";

import "./App.scss";

@inject("store")
export default class App extends React.Component {
  props: {
    children: *,
    routes: *,
    store: AppStore,
  };
  state = {
    currentInstance: "localhost",
    instances: ["localhost"],
    newInstance: null
  }
  componentDidMount() {
    this.setState({
      currentInstance: localStorage.getItem("currentInstance") ? localStorage.getItem("currentInstance") : "localhost",
      instances: localStorage.getItem("instances") ? localStorage.getItem("instances").split(',') : ["localhost"],
      newInstance: null
    })
  }
  constructor(props) {
    super(props);

    this.appStore = props.store;
    this.loginStore = this.appStore.login;
    this.containersStore = this.appStore.containers;
    this.imagesStore = this.appStore.images;
    this.volumesStore = this.appStore.volumes;
    this.networksStore = this.appStore.networks;
  }

  logout = () => {
    if (confirm("Are you sure you want to log out?")) {
      this.loginStore.logout();
    }
  };

  pruneContainers = () => {
    if (confirm("Are you sure you want to delete stopped containers?")) {
      this.containersStore.pruneContainers();
    }
  };

  pruneImages = () => {
    if (confirm("Are you sure you want to delete unused images?")) {
      this.imagesStore.pruneImages();
    }
  };

  pruneVolumes = () => {
    if (confirm("Are you sure you want to delete unused volumes?")) {
      this.volumesStore.pruneVolumes();
    }
  };

  pruneNetworks = () => {
    if (confirm("Are you sure you want to delete unused networks?")) {
      this.networksStore.pruneNetworks();
    }
  };
  onChange = e => {
    localStorage.setItem("currentInstance",e.target.value)
    this.setState({
      currentInstance: e.target.value,
      instances: this.state.instances
    })
  }
  onInstanceType = e => {
    this.setState({
      currentInstance: this.state.currentInstance,
      instances: this.state.instances,
      newInstance: e.target.value
    })
  } 
  onAddInstance = () => {
    let inst = this.state.instances
    inst.push(this.state.newInstance) 
    localStorage.setItem("instances",inst)
    this.setState({
      currentInstance: this.state.currentInstance,
      instances: inst,
      newInstance: null
    })
  }
  render() {
    const route = this.props.routes[this.props.routes.length - 1].path;
    const {currentInstance, instances} = this.state;
    let button = null,
      images = "",
      containerStats = "",
      dockerfileGenerator = "",
      containers = "",
      volumes = "",
      networks = "";

    switch (route) {
      case "images":
        button = (
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={this.pruneImages}
          >
            Delete all unused images
          </button>
        );
        images = "active";
        break;
      case "container-stats":
        containerStats = "active";
        break;
      case "dockerfile-generator":
        dockerfileGenerator = "active";
        break;
      case "containers":
        button = (
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={this.pruneContainers}
          >
            Delete all stopped containers
          </button>
        );
        containers = "active";
        break;
      case "volumes":
        button = (
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={this.pruneVolumes}
          >
            Delete all unused volumes
          </button>
        );
        volumes = "active";
        break;
      case "networks":
        button = (
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={this.pruneNetworks}
          >
            Delete all unused networks
          </button>
        );
        networks = "active";
        break;
    }

    return (
      <div className="App">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <span className="navbar-brand">Docker UI</span>
            </div>
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                <li className={containerStats}>
                  <Link to="/container-stats">Stats</Link>
                </li>
                <li className={images}>
                  <Link to="/images">Images</Link>
                </li>
                <li className={containers}>
                  <Link to="/containers">Containers</Link>
                </li>
                <li className={volumes}>
                  <Link to="/volumes">Volumes</Link>
                </li>
                <li className={networks}>
                  <Link to="/networks">Networks</Link>
                </li>
                <li className={dockerfileGenerator}>
                  <Link to="/dockerfile-generator">Dockerfile generator</Link>
                </li>
              </ul>
              <form className="navbar-form navbar-left">{button}</form>
              <form className="navbar-form navbar-left">
                <details>
                  <summary className="btn btn-default">{currentInstance}</summary>
                  <div className="SelectMenu">
                    <div className="SelectMenu-modal">
                      <header className="SelectMenu-header">
                        <span className="SelectMenu-title">Switch docker engine instances</span>
                      </header>
                    <div className="SelectMenu-filter">
                      <input placeholder="Docker instance address" onChange={this.onInstanceType} />
                      <div className="btn btn-default btn-sm" onClick={this.onAddInstance}>Add instance</div>
                    </div>
                    <div className="SelectMenu-list">
                      <span className="SelectMenu-title">Instances</span>
                      <select onChange={this.onChange}>
                        {instances.map((e, idx) => {
                          return this.state.currentInstance === e ? <option key={idx} value={e} selected>{e}</option> : <option key={idx} value={e}>{e}</option>
                        })}
                      </select>
                    </div>
                    </div>
                  </div>
                </details>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="glyphicon glyphicon-user" />
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#" onClick={this.logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
