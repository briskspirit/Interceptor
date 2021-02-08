import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';

import { JoystickSettings } from './JoystickSettings';
import ReactNipple from 'react-nipple';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';

import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = theme => ({
  joystick: {
    //background: '#222',
    //color: '#efefef',
    height: '80vh',
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
});


class Joystick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_settings: false,
      rateHz: 10,
      revision: 0,
      speeddial: false,
      enabled: false,
    }
  }

  joystick_msg = {
    testJoystick: {
      axes: [0, 0, 0, 0], // Axis 0, 1, 2, 3
      buttons: [],
      enabled: true,
      axesMode: ['', '', '', ''] // Axis 0, 1, 2, 3
    }
  };

  joy_finetune = {
    axes_scale: [
      [1, 1], // axis_0
      [1, 1], // axis_1
      [1, 1], // axis_2
      [1, 1], // axis_3
    ],
    axes_deadzone: [0.01, 0.01, 0.01, 0.01], // Axis 0, 1, 2, 3
    restJoystick_0: true,
    restJoystick_1: true,
    axesMode: ['interceptor', 'interceptor', 'interceptor', 'interceptor'],
  }

  last_timestamp = 0;
  data_revision = 0;
  renderJoystick_0 = true;
  renderJoystick_1 = true;

  componentDidMount() {
    this.render_delay = setInterval(this.renderDelay, 1000 / this.state.rateHz);
    this.checkJoy = setInterval(this.realGamepad, 50);
  }

  componentWillUnmount() {
    clearInterval(this.render_delay);
    clearInterval(this.checkJoy);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.active) return false;
    return nextState.revision !== this.state.revision || nextState.speeddial !== this.state.speeddial || nextState !== this.state.show_settings;
  }

  renderDelay = () => {
    clearInterval(this.render_delay);
    if (this.state.enabled) {
      this.joystick_msg.testJoystick.axesMode = this.joy_finetune.axesMode;
      this.props.procData(this.joystick_msg);
    }
    if (this.state.revision !== this.data_revision) this.setState({ revision: this.data_revision });
    this.render_delay = setInterval(this.renderDelay, 1000 / this.state.rateHz);
  };

  resetMessage = () => {
    this.joystick_msg.testJoystick.enabled = this.state.enabled;
    if (this.state.enabled) return;
    this.props.procData(this.joystick_msg);
  }

  realGamepad = () => {
    const gamepads = navigator.getGamepads();
    Object.values(gamepads).forEach(gamepad => {
      if (!gamepad ||
        gamepad.timestamp === this.last_timestamp ||
        gamepad.id.startsWith("Surface")) return; //"surface" - device that is reported but not considered as a gamepad for our purpose!

      gamepad.axes.forEach((value, index) => {
        let axis = value;
        const deadzone = parseFloat(this.joy_finetune.axes_deadzone[index]);
        const scale_neg = parseFloat(this.joy_finetune.axes_scale[index][0]);
        const scale_pos = parseFloat(this.joy_finetune.axes_scale[index][1]);
        if (-deadzone < axis && axis < deadzone) axis = 0;
        if (axis < 0) axis *= scale_neg;
        else axis *= scale_pos;
        this.joystick_msg.testJoystick.axes[index] = axis;
      })

      const buttons = [];
      Object.values(gamepad.buttons).forEach(button => {
        buttons.push(button.pressed);
      });
      this.joystick_msg.testJoystick.buttons = buttons;
      this.data_revision += 1;
      this.last_timestamp = gamepad.timestamp;
    })
  }

  virtualJoystick = (joy_index, data) => {
    if (data === 0) {
      this.joystick_msg.testJoystick.axes[joy_index] = 0;
      this.joystick_msg.testJoystick.axes[joy_index + 1] = 0;
      this.data_revision += 1;
      return;
    }
    const size_scale = data.instance.options.size / 2;
    let axis_x = (data.position.x - data.instance.position.x) / size_scale * !data.lockX;
    let axis_y = (data.position.y - data.instance.position.y) / size_scale * !data.lockY;
    const axes_scale = this.joy_finetune.axes_scale;
    if (axis_x < 0) axis_x *= parseFloat(axes_scale[joy_index][0]);
    else axis_x *= parseFloat(axes_scale[joy_index][1]);
    if (axis_y < 0) parseFloat(axis_y *= axes_scale[joy_index + 1][0]);
    else axis_y *= parseFloat(axes_scale[joy_index + 1][1]);
    this.joystick_msg.testJoystick.axes[joy_index] = axis_x;
    this.joystick_msg.testJoystick.axes[joy_index + 1] = axis_y;
    this.data_revision += 1;
  }

  render() {
    //console.log("Rendering Joystick");
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid
          className={classes.joystick}
          container
          spacing={0}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={6} align="center">
            <Typography variant="subtitle2">
              X:{this.joystick_msg.testJoystick.axes[0].toFixed(3)} /
              Y:{this.joystick_msg.testJoystick.axes[1].toFixed(3)}
            </Typography>
            {this.renderJoystick_0 ? (
              <ReactNipple
                options={{
                  mode: 'semi',
                  position: { top: '50%', left: '50%' },
                  color: 'red',
                  size: 200,
                  dynamicPage: true,
                  lockX: false,
                  lockY: false,
                  restJoystick: this.joy_finetune.restJoystick_0,
                  threshold: 0.06
                }}
                style={{
                  outline: '1px dashed grey',
                  height: '75vh',
                  position: 'relative'
                }}
                onMove={(evt, data) => this.virtualJoystick(0, data)}
                onEnd={() => { if (this.joy_finetune.restJoystick_0) this.virtualJoystick(0, 0) }} // Reseting to 0 on joystick rest (only when restJoystick: true)
              />) : (this.renderJoystick_0 = true, null)}
          </Grid>
          <Grid item xs={6} align="center">
            <Typography variant="subtitle2">
              X:{this.joystick_msg.testJoystick.axes[2].toFixed(3)} /
              Y:{this.joystick_msg.testJoystick.axes[3].toFixed(3)}
            </Typography>
            {this.renderJoystick_1 ? (
              <ReactNipple
                options={{
                  mode: 'semi',
                  position: { top: '50%', left: '50%' },
                  color: 'red',
                  size: 200,
                  dynamicPage: true,
                  lockX: false,
                  lockY: false,
                  restJoystick: this.joy_finetune.restJoystick_1,
                  threshold: 0.06
                }}
                style={{
                  outline: '1px dashed grey',
                  height: '75vh',
                  position: 'relative'
                }}
                onMove={(evt, data) => this.virtualJoystick(2, data)}
                onEnd={() => { if (this.joy_finetune.restJoystick_1) this.virtualJoystick(2, 0) }}
              />) : (this.renderJoystick_1 = true, null)}
          </Grid>
        </Grid>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          FabProps={{ size: 'small', color: "secondary" }}
          onClick={() => this.setState({ speeddial: !this.state.speeddial })}
          open={this.state.speeddial}
        >
          <SpeedDialAction
            icon={this.state.enabled ? <SyncDisabledIcon /> : <SyncIcon />}
            tooltipTitle={this.state.enabled ? 'Disable' : 'Enable'}
            tooltipOpen
            onClick={() => this.setState({ enabled: !this.state.enabled }, this.resetMessage)}
          />
          <SpeedDialAction
            icon={<SettingsIcon />}
            tooltipTitle="Settings"
            tooltipOpen
            onClick={() => { this.setState({ show_settings: true }) }}
          />
        </SpeedDial>
        {this.state.show_settings ? (
          <JoystickSettings
            setSettings={
              (joy_finetune) => {
                this.setState({ show_settings: false });
                this.joy_finetune = joy_finetune;
                this.renderJoystick_0 = false;
                this.renderJoystick_1 = false;
              }
            }
            show={this.state.show_settings}
            joy_finetune={this.joy_finetune}
          />
        ) : (null)}
      </Fragment>
    );
  }
}

Joystick.propTypes = {
  classes: propTypes.object.isRequired,
  procData: propTypes.func.isRequired,
  active: propTypes.bool.isRequired,
}

export default withStyles(styles)(Joystick);