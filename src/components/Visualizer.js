import React, { PureComponent } from "react";
import Spectrogram from "../Spectrogram";
import pianoKeys from "../images/piano-keys.png";

const SPECTROGRAM_MODES = ["Linear FFT", "Log FFT", "Constant Q"];
const WEIGHTING_MODES = [
  { label: "None", description: "No attenuation" },
  {
    label: "A-Weighting",
    description:
      "Darkens low and high frequencies to approximate sensitivity of human hearing.",
  },
];
const FFT_SIZES = [512, 1024, 2048, 4096, 8192];
const FFT_LABELS = ["512", "1K", "2K", "4K", "8K", "16K"];
const SPEEDS = [1, 2, 4];
const SPEED_LABELS = ["Lo", "Med", "Hi"];
const VIS_WIDTH = 448;

export default class Visualizer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      vizMode: 2,
      weightingMode: 1,
      fftSize: 2048,
      speed: 2,
      enabled: false,
    };

    this.freqCanvasRef = React.createRef();
    this.specCanvasRef = React.createRef();
    this.pianoKeysRef = React.createRef();
  }

  componentDidMount() {
    this.spectrogram = new Spectrogram(
      this.props.chipCore,
      this.props.audioCtx,
      this.props.sourceNode,
      this.freqCanvasRef.current,
      this.specCanvasRef.current,
      this.pianoKeysRef.current,
    );
    this.spectrogram.setMode(this.state.vizMode);
    this.spectrogram.setWeighting(this.state.weightingMode);
    this.spectrogram.setSpeed(this.state.speed);
  }

  componentDidUpdate(prevProps) {
    this.spectrogram.setPaused(this.state.enabled ? this.props.paused : true);
  }

  handleModeClick = (e) => {
    const mode = parseInt(e.target.value, 10);
    this.setState({ vizMode: mode });
    this.spectrogram.setMode(mode);
  };

  handleWeightingModeClick = (e) => {
    const mode = parseInt(e.target.value, 10);
    this.setState({ weightingMode: mode });
    this.spectrogram.setWeighting(mode);
  };

  handleFFTSizeClick = (e) => {
    const size = parseInt(e.target.value, 10);
    this.setState({ fftSize: size });
    this.spectrogram.setFFTSize(size);
  };

  handleSpeedClick = (e) => {
    const speed = parseInt(e.target.value, 10);
    this.setState({ speed: speed });
    this.spectrogram.setSpeed(speed);
  };

  handleToggleVisualizer = (e) => {
    // const enabled = e.target.value === 'true';
    this.setState({ enabled: !this.state.enabled });
  };

  render() {
    const enabledStyle = {
      display: this.state.enabled ? "block" : "none",
      width: VIS_WIDTH,
      boxSizing: "border-box",
    };
    return (
      <div className="Visualizer">
        <h3 className="Visualizer-toggle">
          <label className="inline">
            <input
              onChange={this.props.handleToggleAnalysis}
              type="checkbox"
              // value={true}
              checked={this.props.analysisEnabled}
              name="analysis-enabled"
            />
            Analysis
          </label>
          <label className="inline" style={{ marginLeft: "20px" }}>
            <input
              onChange={this.handleToggleVisualizer}
              type="checkbox"
              // value={true}
              checked={this.state.enabled}
              name="visualizer-enabled"
            />
            Visualizer
          </label>
          <label className="inline" style={{ marginLeft: "20px" }}>
            <input
              onChange={this.props.handleToggleSettings}
              type="checkbox"
              // value={true}
              checked={this.props.settingsEnabled}
              name="settings-enabled"
            />
            Settings
          </label>
        </h3>
        <div className="Visualizer-options" style={enabledStyle}>
          <div>
            Mode:{" "}
            {SPECTROGRAM_MODES.map((mode, i) => (
              <label key={"m_" + i} className="inline">
                <input
                  onClick={this.handleModeClick}
                  type="radio"
                  name="spectrogram-mode"
                  defaultChecked={this.state.vizMode === i}
                  value={i}
                />
                {mode}
              </label>
            ))}
          </div>
          {this.state.vizMode === 2 ? (
            <div>
              Weighting:{" "}
              {WEIGHTING_MODES.map((mode, i) => (
                <label
                  title={mode.description}
                  key={"w_" + i}
                  className="inline"
                >
                  <input
                    onClick={this.handleWeightingModeClick}
                    type="radio"
                    name="weighting-mode"
                    defaultChecked={this.state.weightingMode === i}
                    value={i}
                  />
                  {mode.label}
                </label>
              ))}
            </div>
          ) : (
            <div>
              FFT Size:{" "}
              {FFT_SIZES.map((size, i) => (
                <label key={"f_" + i} className="inline">
                  <input
                    onClick={this.handleFFTSizeClick}
                    type="radio"
                    name="fft-size"
                    defaultChecked={this.state.fftSize === size}
                    value={size}
                  />
                  {FFT_LABELS[i]}
                </label>
              ))}
            </div>
          )}
          <div title="Vertical scrolling speed (pixels per frame)">
            Speed:{" "}
            {SPEEDS.map((speed, i) => (
              <label key={"s_" + i} className="inline">
                <input
                  onClick={this.handleSpeedClick}
                  type="radio"
                  name="speed"
                  defaultChecked={this.state.speed === speed}
                  value={speed}
                />
                {SPEED_LABELS[i]}
              </label>
            ))}
          </div>
        </div>
        <canvas
          style={enabledStyle}
          className="Visualizer-analyzer"
          width={VIS_WIDTH}
          height={60}
          ref={this.freqCanvasRef}
        />
        <canvas
          style={enabledStyle}
          className="Visualizer-spectrogram"
          width={VIS_WIDTH}
          height={800}
          ref={this.specCanvasRef}
        />
        <img
          src={pianoKeys}
          className="Visualizer-overlay"
          ref={this.pianoKeysRef}
          alt="Piano keys"
          style={{
            display:
              this.state.enabled && this.state.vizMode === 2 ? "block" : "none",
            width: VIS_WIDTH,
          }}
        />
      </div>
    );
  }
}
