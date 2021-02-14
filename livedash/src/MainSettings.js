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
  Grid,
  FormControlLabel,
  Switch,
} from '@material-ui/core';


export class MainSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws_url: 'ws://',
      rateHz: 20,
      dark_theme: false,
    };
  }

  componentDidMount() { //Unsafe! Need to get rid of!
    this.setState({
      ws_url: this.props.ws_url,
      rateHz: this.props.rateHz,
      dark_theme: this.props.dark_theme,
    });
  }

  shouldComponentUpdate(nextProps, nextState) { // Limits re-render
    if (nextProps.show !== this.props.show || nextState !== this.state) return true;
    return false;
  }

  render() {
    //console.log("Rendering MainSettings");
    return (
      <Dialog
        open={this.props.show}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Main settings</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column" alignItems="flex-start">
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="ws_url">WebSocket URL</InputLabel>
                <Input
                  id="ws_url"
                  value={this.state.ws_url}
                  onChange={event => this.setState({ ws_url: event.target.value })}
                  aria-describedby="ws_url-helper-text"
                  inputProps={{
                    'aria-label': 'WebSocket URL',
                  }}
                />
                <FormHelperText id="ws_url-helper-text">Tethered WiFi ws://192.168.43.1:8989</FormHelperText>
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
              <FormControlLabel
                control={<Switch checked={this.state.dark_theme} onChange={() => this.setState({ dark_theme: !this.state.dark_theme })} name="dark_theme" />}
                label="Dark theme"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.setSettings(this.state.ws_url, this.state.rateHz, this.state.dark_theme)} color="default">
            Save
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

MainSettings.propTypes = {
  show: propTypes.bool.isRequired,
  ws_url: propTypes.string.isRequired,
  rateHz: propTypes.number.isRequired,
  dark_theme: propTypes.bool,
  setSettings: propTypes.func.isRequired,
}