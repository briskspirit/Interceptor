import React, { Component } from 'react';
import propTypes from 'prop-types';

import Plotly from 'plotly.js-gl2d-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);


export class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Object.values(this.props.lines),
      layout: {
        colorway: ["#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#e377c2", "#bcbd22", "#17becf", "#1f77b4"],
        titlefont: {
          family: 'Arial, sans-serif',
          size: 24,
          color: "rgba(119,119,119,1)",
        },
        xaxis: {
          autorange: true,
          gridcolor: "rgba(119,119,119,0.2)",
          color: "rgba(119,119,119,1)",
          //color: "#FF4500",
          //rangeslider: {} // Degrades performance slightly, for scattergl only as a scroll (not showing contents)
        },
        yaxis: {
          autorange: true,
          color: "rgba(119,119,119,1)",
          //color: "#FF4500",
          gridcolor: "rgba(119,119,119,0.2)",
          tickangle: "auto",
          type: 'linear'
        },
        showlegend: true,
        legend: {
          x: 0,
          y: 1.06,
          "orientation": "h",
          font: {
            color: "rgba(119,119,119,1)",
          },
        },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)",
        width: 700,
        height: 450,
        margin: {
          l: 50,
          r: 5,
          b: 30,
          t: 50,
          pad: 4
        },
        datarevision: 0
      },
      frames: [],
      config: {
        displayModeBar: true,
        displaylogo: false
      },
      revision: 0
    };
    this.responsiveChartRef = React.createRef();
  }

  layout = {};

  componentDidMount() {
    const el_width = this.responsiveChartRef.current.getBoundingClientRect().width - 5;
    const el_height = this.responsiveChartRef.current.getBoundingClientRect().height;
    if (el_width !== this.state.layout.width) {
      this.setState({ layout: { ...this.state.layout, width: el_width, height: el_height } });
    }

    this.resizeListener = window.addEventListener('resize', () => {
      if (this.responsiveChartRef.current) {
        const el_width = this.responsiveChartRef.current.getBoundingClientRect().width - 5;
        const el_height = this.responsiveChartRef.current.getBoundingClientRect().height;
        if (el_width !== this.state.layout.width) {
          this.setState({ layout: { ...this.state.layout, width: el_width, height: el_height } });
        }
      }
    });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  render() {
    //console.log("Rendering ScatterPlot: " + this.props.event.layout.title);
    //console.log("Revision: " + this.props.event.revision + " datarevision: " + this.props.event.layout.datarevision)
    return (
      <div ref={this.responsiveChartRef} id={this.props.event.layout.title} style={{ height: '46vh' }}>
        <Plot
          data={this.state.data}
          layout={{ ...this.layout, ...this.state.layout, ...this.props.event.layout }}
          revision={this.props.event.revision}
          frames={[...this.state.frames, ...this.props.event.frames]}
          config={{ ...this.state.config, ...this.props.event.config }}
          //onInitialized={figure => this.setState(figure)}
          onUpdate={figure => this.layout = figure.layout}
        />
      </div>
    );
  }
}

ScatterPlot.propTypes = {
  lines: propTypes.object.isRequired,
  event: propTypes.object.isRequired,
}