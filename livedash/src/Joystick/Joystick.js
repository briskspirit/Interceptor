import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';

import ReactNipple from 'react-nipple';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';

import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';

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
      restJoystick_0: true,
      restJoystick_1: true,
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
      axesMode: ['interceptor', 'interceptor', 'interceptor', 'interceptor']
    }
  };

  joy_finetune = {
    axes_scale: [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    axes_deadzone: [0.01, 0.01, 0.01, 0.01]
  }

  last_timestamp = 0;
  data_revision = 0;

  componentDidMount() {
    this.render_delay = setInterval(this.renderDelay, 1000 / this.state.rateHz);
    this.checkJoy = setInterval(this.readJoystick, 50);
  }

  componentWillUnmount() {
    clearInterval(this.render_delay);
    clearInterval(this.checkJoy);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.revision !== this.state.revision || nextState.speeddial !== this.state.speeddial;
  }

  renderDelay = () => {
    clearInterval(this.render_delay);
    if (this.state.enabled) this.props.procData(this.joystick_msg);
    if (this.state.revision !== this.data_revision) this.setState({ revision: this.data_revision });
    this.render_delay = setInterval(this.renderDelay, 1000 / this.state.rateHz);
  };

  resetMessage = () => {
    this.joystick_msg.testJoystick.enabled = this.state.enabled;
    if (this.state.enabled) return;
    this.props.procData(this.joystick_msg);
  }

  readJoystick = () => {
    const gamepads = navigator.getGamepads();
    Object.values(gamepads).forEach(gamepad => {
      if (!gamepad ||
        gamepad.timestamp === this.last_timestamp ||
        gamepad.id.startsWith("Surface")) return; //"surface" - device that is reported but not considered as a gamepad for our purpose!

      gamepad.axes.forEach((value, index) => {
        let axis = value;
        const deadzone = this.joy_finetune.axes_deadzone[index];
        const scale_neg = this.joy_finetune.axes_scale[index][0];
        const scale_pos = this.joy_finetune.axes_scale[index][1];
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

  returnNormalized = (joy_index, data) => {
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
    if (axis_x < 0) axis_x *= axes_scale[joy_index][0];
    else axis_x *= axes_scale[joy_index][1];
    if (axis_y < 0) axis_y *= axes_scale[joy_index + 1][0];
    else axis_y *= axes_scale[joy_index + 1][1];
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
            X:{this.joystick_msg.testJoystick.axes[0].toFixed(3)}/Y:{this.joystick_msg.testJoystick.axes[1].toFixed(3)}
            <div>
              <ReactNipple
                options={{ mode: 'dynamic', position: { top: '50%', left: '50%' }, color: 'red', size: 200, dynamicPage: true, lockY: false, restJoystick: this.state.restJoystick_0, threshold: 0.06 }}
                style={{
                  outline: '1px dashed grey',
                  //width: 250,
                  height: '75vh',
                  position: 'relative'
                }}
                onMove={(evt, data) => this.returnNormalized(0, data)}
                onEnd={() => { if (this.state.restJoystick_0) this.returnNormalized(0, 0) }} // Reseting to 0 on joystick rest (only when restJoystick: true)
              />
            </div>
          </Grid>
          <Grid item xs={6} align="center">
            X:{this.joystick_msg.testJoystick.axes[2].toFixed(3)}/Y:{this.joystick_msg.testJoystick.axes[3].toFixed(3)}
            <div>
              <ReactNipple
                options={{ mode: 'dynamic', position: { top: '50%', left: '50%' }, color: 'red', size: 200, dynamicPage: true, lockX: false, restJoystick: this.state.restJoystick_1, threshold: 0.06 }}
                style={{
                  outline: '1px dashed grey',
                  //width: 250,
                  height: '75vh',
                  position: 'relative'
                }}
                onMove={(evt, data) => this.returnNormalized(2, data)}
                onEnd={() => { if (this.state.restJoystick_1) this.returnNormalized(2, 0) }}
              />
            </div>
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
        </SpeedDial>
      </Fragment>
    );
  }
}

Joystick.propTypes = {
  classes: propTypes.object.isRequired,
  procData: propTypes.func.isRequired,
}

export default withStyles(styles)(Joystick);