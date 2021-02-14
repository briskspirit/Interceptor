import React, { Component } from 'react';
import propTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  FormControlLabel,
  Switch,
  Grid,
} from '@material-ui/core';

export class GraphSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: 0,
      rateHz: 20,
      max_datapoints: 100,
      webgl: true,
    };
  }

  componentDidMount() { //Unsafe! Need to get rid of!
    this.setState({
      cols: this.props.cols,
      rateHz: this.props.rateHz,
      max_datapoints: this.props.max_datapoints,
      webgl: this.props.webgl,
    });
  }

  shouldComponentUpdate(nextProps, nextState) { // Limits re-render
    if (nextProps.show !== this.props.show || nextState !== this.state) return true;
    return false;
  }

  render() {
    //console.log("Rendering GraphSettings");
    return (
      <Dialog
        open={this.props.show}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Graphs settings</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column" alignItems="flex-start">
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="cols">Graph columns</InputLabel>
                <Input
                  id="cols"
                  value={this.state.cols}
                  onChange={event => this.setState({ cols: Math.min(Math.max(parseInt(event.target.value), 1), 12) })}
                  aria-describedby="cols-helper-text"
                  inputProps={{
                    'aria-label': 'Graph columns',
                  }}
                />
                <FormHelperText id="cols-helper-text">Max: 12</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="rateHz">Render rate</InputLabel>
                <Input
                  id="rateHz"
                  value={this.state.rateHz}
                  onChange={event => this.setState({ rateHz: Math.min(Math.max(parseInt(event.target.value), 0.5), 20) })}
                  endAdornment={<InputAdornment position="end">Hz</InputAdornment>}
                  aria-describedby="rateHz-helper-text"
                  inputProps={{
                    'aria-label': 'Render rate',
                  }}
                />
                <FormHelperText id="rateHz-helper-text">Min: 0.5, Max: 20</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="max_datapoints">Max data points</InputLabel>
                <Input
                  id="max_datapoints"
                  value={this.state.max_datapoints}
                  onChange={event => this.setState({ max_datapoints: Math.min(Math.max(parseInt(event.target.value), 20), 10000) })}
                  aria-describedby="max_datapoints-helper-text"
                  inputProps={{
                    'aria-label': 'Max data points',
                  }}
                />
                <FormHelperText id="max_datapoints-helper-text">Max: 10000</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Switch checked={this.state.webgl} onChange={() => this.setState({ webgl: !this.state.webgl })} name="webGL" />}
                label="WebGL support"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.setSettings(this.state.cols, this.state.rateHz, this.state.max_datapoints, this.state.webgl)} color="default">
            Save
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

GraphSettings.propTypes = {
  show: propTypes.bool.isRequired,
  cols: propTypes.number.isRequired,
  rateHz: propTypes.number.isRequired,
  max_datapoints: propTypes.number.isRequired,
  webgl: propTypes.bool.isRequired,
  setSettings: propTypes.func.isRequired,
}