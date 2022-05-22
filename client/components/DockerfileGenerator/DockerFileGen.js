import React from "react";
import DockerfileBaseImage from "./DockerfileBaseImage";
import { styles } from "./DockerFileGen.style";
import DockerfileGenUsage from "./DockerfileGenUsage";
import DockerfileInstruction from "./DockerfileInstruction";
import { inject, observer } from "mobx-react";
import AppStore from "stores/AppStore";

function Instruction(type = "", params = "") {
  this.type = type;
  this.params = params;
}

function Stage(
  platform = "",
  image = "",
  tag = "",
  as = "",
  instructions = []
) {
  this.from = {
    platform,
    image,
    tag,
    as,
  };
  this.instructions = instructions;
}

@inject("store")
@observer
export default class DockerFileGen extends React.Component {
  props: {
    store: AppStore,
  };

  constructor(props) {
    super(props);
    this.appStore = props.store;
    this.dockerfileGeneratorStore = this.appStore.dockerfileGenerator;
    this.state = { stages: [] };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKBShortCuts.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKBShortCuts);
  }

  handleKBShortCuts(e) {
    // Shift + ; shortcut
    e.altKey &&
      e.keyCode === 190 &&
      this.setState((state) => {
        let newStages = state.stages;
        newStages.pop();
        return { stages: newStages };
      });
    // Shift + : shortcut
    e.altKey &&
      e.keyCode === 191 &&
      this.setState((state) => {
        let newInstrutions =
          state.stages[this.state.stages.length - 1].instructions;
        newInstrutions.pop();
        return state;
      });
    // escp shortcut
    e.keyCode === 27 && this.setState((state) => ({ stages: [] }));
  }

  render() {
    function handleAddStageClick(e) {
      this.setState((state) => {
        state.stages.push(new Stage());

        return state;
      });
    }

    function handleAddInstructionClick(stageIndex, e) {
      this.setState((state) => {
        let stage = state.stages[stageIndex];
        stage.instructions.push(new Instruction());
        return state;
      });
    }

    function handleInputChange(stageIndex, e) {
      const { name, value } = e.target;

      this.setState((state) => {
        let prevStage = state.stages[stageIndex]["from"];
        state.stages[stageIndex]["from"] = { ...prevStage, [name]: value };
        return state;
      });
    }

    function handleSubmit(e) {
      e.preventDefault();
      this.dockerfileGeneratorStore
        .generateDockerfile(this.state.stages)
        .then((res) => {
          // Workaround to download the retrieved file
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("hidden", true);
          link.setAttribute("download", "Dockerfile"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
    }

    function handleInstructionInputChange(stageIndex, instIndex, e) {
      e.persist();
      let { name, value = "EXPOSE" } = e.target;
      this.setState((state) => {
        if (name === "params")
          value = value && value.split(",").map((s) => s.trim());
        state.stages[stageIndex].instructions[instIndex][name] = value;

        return state;
      });
    }

    return (
      <div style={{ padding: "16px 64px" }}>
        <h2>Dockerfile generator</h2>
        <DockerfileGenUsage />
        <form onSubmit={handleSubmit.bind(this)}>
          {this.state.stages.map((stage, stageIndex) => (
            <div
              key={stageIndex}
              className="form-inline"
              style={styles.stage_wrapper}
            >
              <DockerfileBaseImage
                onChange={handleInputChange.bind(this, stageIndex)}
              />
              {this.state.stages[stageIndex].instructions.map(
                (e, instIndex) => (
                  <DockerfileInstruction
                    key={`${stageIndex}${instIndex}`}
                    onChange={handleInstructionInputChange.bind(
                      this,
                      stageIndex,
                      instIndex
                    )}
                  />
                )
              )}

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddInstructionClick.bind(this, stageIndex)}
              >
                Add instruction
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary"
            style={styles.mr_8}
            onClick={handleAddStageClick.bind(this)}
          >
            Add a stage
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            disabled={this.state.stages.length <= 0}
          >
            Generate Dockerfile
          </button>
        </form>
      </div>
    );
  }
}
