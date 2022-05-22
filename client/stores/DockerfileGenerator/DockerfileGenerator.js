import axios from "../../lib/axios";
import { action } from "mobx";
import BaseStore from "stores/BaseStore";

export default class DockerfileGenerator extends BaseStore {
  constructor(appStore) {
    super();

    this.appStore = appStore;
  }

  @action generateDockerfile = (stages = []) => {
    this.setError();

    try {
      return axios({
        method: "post",
        url: "/dockerfile",
        baseURL: "/api",
        data: stages,
      });
    } catch (e) {
      this.setError(e);
    }
  };
}
