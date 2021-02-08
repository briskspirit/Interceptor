import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';

import { ScatterPlot } from './ScatterPlot';
import { AddLines } from './AddLines';
import { AddGraph } from './AddGraph';
import { GraphSettings } from './GraphSettings';

import { withStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Grid } from '@material-ui/core';

import LinearScaleIcon from '@material-ui/icons/LinearScale';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const line_def_tpl = {
  x: [],
  y: [],
  type: 'scattergl',
  name: 'Line 1',
  mode: 'lines', //lines+markers
  connectgaps: false
};
const plot_def_tpl = {
  layout: {
    title: 'debug_filler',
    datarevision: 0
  },
  frames: [],
  config: {},
  revision: 0,
  lines_attach: []
}

const styles = theme => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  mainDiv: {
    flexGrow: 1,
  }
});


class GraphDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show_addlines: false,
      show_addgraph: false,
      show_settings: false,
      show_joystick: false,
      layout_cols: 2,
      rateHz: 10,
      max_datapoints: 100,
      webgl: true,
      speeddial: false,
      render_revision: 0,
      global_data_revision: 0,
    }
    this.wshelper = React.createRef(); //Reference to call sendMessage func inside WebSocketHelper
  }

  actions = [
    { icon: <LinearScaleIcon />, name: 'Add Signals', handler: () => { this.setState({ show_addlines: true }) } },
    { icon: <EqualizerIcon />, name: 'Add Graph', handler: () => { this.setState({ show_addgraph: true }) } },
    { icon: <SettingsIcon />, name: 'Settings', handler: () => { this.setState({ show_settings: true }) } },
    { icon: <DeleteForeverIcon />, name: 'DelPlots', handler: () => { this.plots = {} } },
    { icon: <DeleteForeverIcon />, name: 'ClearLines', handler: () => { this.lines = {}; this.selected = {}; } },
  ];

  plots = {};
  lines = {};
  selected = {};
  ws_status = '';

  componentDidMount() {
    this.render_delay = setInterval(this.renderDelay, 1000 / this.state.rateHz); // Limit render? 4graphs/2lines or 2grapgs/8lines at 20Hz
    //Real measured - 2 graphs/2 lines at 50ms, 3 graphs/2 lines at ~80ms, 4graphs/2 lines at ~110ms, 5graphs/2 lines at ~140ms (So around 25-30ms each graph?)
  }

  componentWillUnmount() {
    clearInterval(this.render_delay);
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (!this.props.active) return false;
    return prevState.render_revision !== this.state.render_revision;
  }

  renderDelay = () => {
    clearInterval(this.render_delay);
    this.setState({ render_revision: this.state.render_revision + 1 });
    this.render_delay = setInterval(this.renderDelay, 1000 / this.state.rateHz)
  }

  messageProcess = msg_recv => { // Need to improve, very expensive work!!!
    Object.keys(this.selected).forEach(key_name => {
      this.selected[key_name].forEach(name_y => {
        if (msg_recv.[key_name]) {
          let axis_x = Math.round(msg_recv.[key_name].['logMonoTime'] / 1000000.0) / 1000; // Convert to seconds with 3 digits after the dot.
          let axis_y = null;
          if (name_y.startsWith(':')) {
            const path = name_y.slice(1)
            axis_y = _.get(msg_recv.[key_name], path, null)
          } else axis_y = msg_recv.[key_name].[name_y];

          const line_name = key_name + ':' + name_y;
          if (Array.isArray(axis_y)) {
            axis_y.forEach((y_value, index) => {
              if (typeof y_value === 'boolean') y_value += 0; // Converts boolean to int
              if (typeof y_value !== 'number') y_value = null;
              this.addUpdateLines(line_name + index, axis_x, y_value, this.state.max_datapoints); // Fix the name for Y axis !!!!!
            })
          } else {
            if (typeof axis_y === 'boolean') axis_y += 0; // Converts boolean to int
            if (typeof axis_y !== 'number') axis_y = null;
            this.addUpdateLines(name_y, axis_x, axis_y, this.state.max_datapoints);
          }
        }
      });
    });

  };

  addUpdateLines = (name_y, axis_x, axis_y, values_limit = 100) => {
    if (!this.lines.[name_y]) {
      const line_tpl = JSON.parse(JSON.stringify(line_def_tpl));
      line_tpl['type'] = this.state.webgl ? 'scattergl' : 'scatter';
      line_tpl['name'] = name_y;
      this.lines[name_y] = line_tpl;
    }

    if (this.lines.[name_y].x.slice(-1)[0] >= axis_x) return; // Skip same values for axis X (time)

    this.setState({ global_data_revision: this.state.global_data_revision + 1 })
    this.lines.[name_y].x.push(axis_x);
    this.lines.[name_y].y.push(axis_y);
    if (this.lines.[name_y].x.length > values_limit && values_limit !== 0) {
      this.lines.[name_y].x.shift();
      this.lines.[name_y].y.shift();
    }
  };

  addUpdatePlots = (plot_name = "", lines = []) => {
    if (plot_name.length === 0) plot_name = (Math.random() + 1).toString(36).substring(7); // Generate random name
    if (!this.plots.[plot_name] && lines.length > 0) {
      const plot_tpl = JSON.parse(JSON.stringify(plot_def_tpl));
      plot_tpl['layout']['title'] = plot_name;
      plot_tpl['lines_attach'] = lines;
      this.plots[plot_name] = plot_tpl;
    }
    if (lines.length > 0) this.plots.[plot_name].lines_attach = lines;
    if (this.plots.[plot_name]) {
      this.plots.[plot_name].revision += 1
      this.plots.[plot_name].layout.datarevision = this.plots.[plot_name].revision + 1;
    }
  };

  renderReadyPlots = () => {
    const plots = [];
    Object.keys(this.plots).forEach(key => {
      if (this.plots.[key].lines_attach.length) {
        const lines = {};
        Object.values(this.plots.[key].lines_attach).forEach(line_name => {
          if (this.lines.[line_name]) {
            lines[line_name] = this.lines.[line_name];
          }
        });
        this.addUpdatePlots(key);
        plots.push(<Grid item key={key} xs={12} md={12 / this.state.layout_cols}><ScatterPlot event={this.plots.[key]} lines={lines} /></Grid>);
      }
    });
    return plots;
  };

  render() {
    //console.log("Rendering GraphDashboard");
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid
          container
          direction="row"
          spacing={0}
          justify="flex-start"
          alignItems="flex-start"
        >
          {this.renderReadyPlots()}
        </Grid>
        {this.state.show_addlines ? (
          <AddLines
            setLogParams={event => { this.setState({ show_addlines: false }); this.selected = event }}
            show={this.state.show_addlines}
            prev_selection={this.selected}
          />
        ) : (null)}
        {this.state.show_addgraph ? (
          <AddGraph
            addplot={(plot_name, lines) => this.setState({ show_addgraph: false }, this.addUpdatePlots(plot_name, lines))}
            show={this.state.show_addgraph}
            lines_available={Object.keys(this.lines)}
          />
        ) : (null)}
        {this.state.show_settings ? (
          <GraphSettings
            setSettings={(cols, rate, datapoints, webgl) => this.setState({ show_settings: false, layout_cols: cols, rateHz: rate, max_datapoints: datapoints, webgl: webgl })}
            show={this.state.show_settings}
            cols={this.state.layout_cols}
            rateHz={this.state.rateHz}
            max_datapoints={this.state.max_datapoints}
            webgl={this.state.webgl}
          />
        ) : (null)}
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          FabProps={{ size: 'small', color: "secondary" }}
          onClick={() => this.setState({ speeddial: !this.state.speeddial })}
          open={this.state.speeddial}
        >
          {this.actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={action.handler}
            />
          ))}
        </SpeedDial>
      </Fragment>
    );
  }
}

GraphDashboard.propTypes = {
  classes: propTypes.object.isRequired,
  active: propTypes.bool.isRequired,
}

export default withStyles(styles)(GraphDashboard);