import React, { Component } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Grid,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
} from '@material-ui/core';


export class JoystickSettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.joy_finetune;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  render() {
    //console.log("Rendering JoystickSettings");
    const new_state = _.cloneDeep(this.state);
    return (
      <Dialog
        open={this.props.show}
        aria-labelledby="joystick-settings"
      >
        <DialogTitle id="joystick-settings">Joystick settings</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} direction="row" alignItems="center">
            <Grid item xs={6}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={6} align="center">
                  <FormControl>
                    <InputLabel htmlFor="axis_0_neg">axis_0 negative</InputLabel>
                    <Input
                      id="axis_0_neg"
                      value={new_state.axes_scale[0][0]}
                      onChange={event => { new_state.axes_scale[0][0] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_0 negative',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} align="center">
                  <FormControl>
                    <InputLabel htmlFor="axis_0_pos">axis_0 positive</InputLabel>
                    <Input
                      id="axis_0_pos"
                      value={new_state.axes_scale[0][1]}
                      onChange={event => { new_state.axes_scale[0][1] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_0 positive',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} align="center">
                  <FormControl>
                    <InputLabel htmlFor="axis_1_neg">axis_1 negative</InputLabel>
                    <Input
                      id="axis_1_neg"
                      value={new_state.axes_scale[1][0]}
                      onChange={event => { new_state.axes_scale[1][0] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_1 negative',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} align="center">
                  <FormControl>
                    <InputLabel htmlFor="axis_1_pos">axis_1 positive</InputLabel>
                    <Input
                      id="axis_1_pos"
                      value={new_state.axes_scale[1][1]}
                      onChange={event => { new_state.axes_scale[1][1] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_1 positive',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                  <FormControl fullWidth>
                    <InputLabel htmlFor=">axis_0_deadzone">axis_0 deadzone</InputLabel>
                    <Input
                      id="axis_0_deadzone"
                      value={new_state.axes_deadzone[0]}
                      onChange={event => { new_state.axes_deadzone[0] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_0 deadzone',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                  <FormControl fullWidth>
                    <InputLabel htmlFor="axis_1_deadzone">axis_1 deadzone</InputLabel>
                    <Input
                      id="axis_1_deadzone"
                      value={new_state.axes_deadzone[1]}
                      onChange={event => { new_state.axes_deadzone[1] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_1 deadzone',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                  <FormControl fullWidth>
                    <InputLabel htmlFor='axis_0_mode'>axis_0 mode</InputLabel>
                    <Select
                      id='axis_0_mode'
                      value={new_state.axesMode[0]}
                      onChange={event => { new_state.axesMode[0] = event.target.value; this.setState(new_state); }}
                      displayEmpty
                      inputProps={{ 'aria-label': 'axis_0 mode' }}
                    >
                      <MenuItem value='interceptor'>interceptor</MenuItem>
                      <MenuItem value='injector'>injector</MenuItem>
                      <MenuItem value='adder'>adder</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                  <FormControl fullWidth>
                    <InputLabel htmlFor='axis_1_mode'>axis_1 mode</InputLabel>
                    <Select
                      id='axis_1_mode'
                      value={new_state.axesMode[1]}
                      onChange={event => { new_state.axesMode[1] = event.target.value; this.setState(new_state); }}
                      displayEmpty
                      inputProps={{ 'aria-label': 'axis_1 mode', }}
                    >
                      <MenuItem value='interceptor'>interceptor</MenuItem>
                      <MenuItem value='injector'>injector</MenuItem>
                      <MenuItem value='adder'>adder</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                  <FormControlLabel
                    control={<Switch disabled checked={new_state.restJoystick_0} onChange={() => { new_state.restJoystick_0 = !new_state.restJoystick_0; this.setState(new_state); }} name="restJoystick_0" />}
                    label="vJoystick_0 rest"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={6} align="center">
                  <FormControl>
                    <InputLabel htmlFor="axis_2_neg">axis_2 negative</InputLabel>
                    <Input
                      id="axis_2_neg"
                      value={new_state.axes_scale[2][0]}
                      onChange={event => { new_state.axes_scale[2][0] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_2 negative',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} align="center">
                  <FormControl>
                    <InputLabel htmlFor="axis_2_pos">axis_2 positive</InputLabel>
                    <Input
                      id="axis_2_pos"
                      value={new_state.axes_scale[2][1]}
                      onChange={event => { new_state.axes_scale[2][1] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_2 positive',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} align="center">
                  <FormControl>
                    <InputLabel htmlFor="axis_3_neg">axis_3 negative</InputLabel>
                    <Input
                      id="axis_3_neg"
                      value={new_state.axes_scale[3][0]}
                      onChange={event => { new_state.axes_scale[3][0] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_3 negative',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6} align="center">
                  <FormControl>
                    <InputLabel htmlFor="axis_3_pos">axis_3 positive</InputLabel>
                    <Input
                      id="axis_3_pos"
                      value={new_state.axes_scale[3][1]}
                      onChange={event => { new_state.axes_scale[3][1] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_3 positive',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                  <FormControl fullWidth>
                    <InputLabel htmlFor=">axis_2_deadzone">axis_2 deadzone</InputLabel>
                    <Input
                      id="axis_2_deadzone"
                      value={new_state.axes_deadzone[2]}
                      onChange={event => { new_state.axes_deadzone[2] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_2 deadzone',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                  <FormControl fullWidth>
                    <InputLabel htmlFor="axis_3_deadzone">axis_3 deadzone</InputLabel>
                    <Input
                      id="axis_3_deadzone"
                      value={new_state.axes_deadzone[3]}
                      onChange={event => { new_state.axes_deadzone[3] = event.target.value; this.setState(new_state); }}
                      inputProps={{
                        'aria-label': 'axis_3 deadzone',
                        style: { textAlign: 'center' }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                  <FormControl fullWidth>
                    <InputLabel htmlFor='axis_2_mode'>axis_2 mode</InputLabel>
                    <Select
                      id='axis_2_mode'
                      value={new_state.axesMode[2]}
                      onChange={event => { new_state.axesMode[2] = event.target.value; this.setState(new_state); }}
                      displayEmpty
                      inputProps={{ 'aria-label': 'axis_2 mode' }}
                    >
                      <MenuItem value='interceptor'>interceptor</MenuItem>
                      <MenuItem value='injector'>injector</MenuItem>
                      <MenuItem value='adder'>adder</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                  <FormControl fullWidth>
                    <InputLabel htmlFor='axis_3_mode'>axis_3 mode</InputLabel>
                    <Select
                      id='axis_3_mode'
                      value={new_state.axesMode[3]}
                      onChange={event => { new_state.axesMode[3] = event.target.value; this.setState(new_state); }}
                      displayEmpty
                      inputProps={{ 'aria-label': 'axis_3 mode', }}
                    >
                      <MenuItem value='interceptor'>interceptor</MenuItem>
                      <MenuItem value='injector'>injector</MenuItem>
                      <MenuItem value='adder'>adder</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                  <FormControlLabel
                    control={<Switch disabled checked={new_state.restJoystick_1} onChange={() => { new_state.restJoystick_1 = !new_state.restJoystick_1; this.setState(new_state); }} name="restJoystick_1" />}
                    label="vJoystick_1 rest"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.setSettings(this.state)} color="primary">
            Save
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

JoystickSettings.propTypes = {
  show: propTypes.bool.isRequired,
  joy_finetune: propTypes.object.isRequired,
  setSettings: propTypes.func.isRequired,
}