import axios from 'lib/axios'
import {sortBy} from 'lodash'
import {action, observable} from 'mobx'
import BaseStore from 'stores/BaseStore'

let baseURL = localStorage.getItem("baseUrl");
if(!baseURL) {
    baseURL = "http://localhost:9898";
    localStorage.setItem("baseUrl" , baseURL);
}
axios.defaults.baseURL = baseURL + '/api/v1/';
console.log("after :" + axios.defaults.baseURL)

export default class Volumes extends BaseStore {
  @observable volumes = []

  constructor(appStore) {
    super()

    this.appStore = appStore
  }

  @action createVolume = async volume => {
    this.setError()

    try {
      await axios.post('volumes', volume)
      this.loadVolumes()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action destroyVolume = async id => {
    this.setError()

    try {
      await axios.delete(`volumes/${id}`)
      this.loadVolumes()
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action inspectVolume = async id => {
    this.setError()

    try {
      const res = await axios.get(`volumes/${id}`)
      this.inspect = res.data
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action loadVolumes = async () => {
    this.setError()

    try {
      const res = await axios.get('volumes')
      this.volumes = sortBy(res.data, volume => volume.Name.toLowerCase()).map(volume => ({
        driver: volume.Driver,
        name: volume.Name,
      }))
    }
    catch(e) {
      this.setError(e)
    }
  }

  @action pruneVolumes = async () => {
    this.setError()

    try {
      await axios.post('volumes/prune')
      this.loadVolumes()
    }
    catch(e) {
      this.setError(e)
    }
  }
}
