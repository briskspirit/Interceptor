import React, { Component } from 'react';
import propTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Grid,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

export class AddGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render_revision: 0,
    }
  }
  
  plotname = '';
  lines = [];

  shouldComponentUpdate(nextProps, nextState) { // Limits re-renders
    return nextProps.show !== this.props.show || nextState.render_revision !== this.state.render_revision;
  }

  renderButtons = () => {
    return this.props.lines_available.map(key => {
      return <ToggleButton style={{textTransform: 'none', borderRadius: '0', minWidth: '25ch', maxHeight: '20px'}} value={key} key={key} aria-label={key}>{key}</ToggleButton>
    });
  }

  render() {
    //console.log("Rendering AddGraph");
    return (
      <Dialog
        open={this.props.show}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Graph</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="plotname">Plot Name</InputLabel>
                <Input
                  id="plotname"
                  onChange={event => this.plotname = event.target.value}
                  aria-describedby="plotname-helper-text"
                  inputProps={{
                    'aria-label': 'Plot Name',
                  }}
                />
                <FormHelperText id="plotname-helper-text">Can be left empty</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
            <ToggleButtonGroup orientation="vertical" value={this.lines} onChange={(event, lines) => {this.lines = lines; this.setState({render_revision: this.state.render_revision + 1}); } } aria-label="lines available">
              {this.renderButtons()}
            </ToggleButtonGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.addplot(this.plotname, this.lines)} color="primary">
            Save
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddGraph.propTypes = {
  show: propTypes.bool.isRequired,
  lines_available: propTypes.array.isRequired,
  addplot: propTypes.func.isRequired,
}