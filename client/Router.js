import { Provider } from "mobx-react";
import React from "react";
import {
  Router as ReactRouter,
  Route,
  browserHistory,
  IndexRedirect,
} from "react-router";
import AppStore from "stores/AppStore";
import Login from "./components/Login/Login";
import App from "./components/App";
import Images from "./components/Images/Images";
import Containers from "./components/Containers/Containers";
import Volumes from "./components/Volumes/Volumes";
import Networks from "./components/Networks/Networks";
import Logs from "./components/Logs/Logs";
import ContainerStat from "./components/ContainerStats/ContainerStats";
import DockerFileGen from "./components/dockerfileGenerator/DockerFileGen";
import DockerTerminal from "./components/DockerTerminal/DockerTerminal";

export default class Router extends React.Component {
  props: {
    store: AppStore,
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <ReactRouter history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRedirect to="container-stats" />
            <Route path="login" component={Login} />
            <Route path="images" component={Images} />
            <Route path="containers" component={Containers} />
            <Route path="container-stats" component={ContainerStat} />
            <Route path="dockerfile-generator" component={DockerFileGen} />
            <Route path="docker-terminal/:id" component={DockerTerminal} />
            <Route path="volumes" component={Volumes} />
            <Route path="networks" component={Networks} />
            <Route path="Logs" component={Logs} />
          </Route>
        </ReactRouter>
      </Provider>
    );
  }
}
