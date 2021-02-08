import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Input,
  InputLabel,
  Grid,
  FormControlLabel,
  Switch,
  Fab,
} from '@material-ui/core';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const styles = theme => ({
  loadFab: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(14),
  },
  saveFab: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});


class OPEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rateHz: 10,
      revision: 0,
      op_data: {},
    }
  }

  last_timestamp = 0;
  data_revision = 0;

  componentDidMount() {
    this.render_delay = setInterval(this.renderDelay, 1000 / this.state.rateHz);
  }

  componentWillUnmount() {
    clearInterval(this.render_delay);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.revision !== this.state.revision;
  }

  renderDelay = () => {
    clearInterval(this.render_delay);
    this.setState({ revision: this.revision + 1 });
    this.render_delay = setInterval(this.renderDelay, 1000 / this.state.rateHz);
  };

  messageProcess = msg_recv => { // Need to improve, very expensive work!!!
    if ('opEdit' in msg_recv) this.setState({ op_data: msg_recv.opEdit })
  };

  renderParams = op_data => {
    const render_obj = [];

    Object.entries(op_data).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        render_obj.push(
          <Grid item xs={12} sm={6} md={3} key={key}>
            <FormControlLabel
              id={key}
              control={<Switch checked={value} onChange={() => { op_data.[key] = !op_data.[key]; this.setState({ op_data: op_data }); }} name={key} />}
              label={key}
            />
          </Grid>
        );
      }
      else if (typeof value === 'object') {
        render_obj.push(
          <Grid item xs={12} sm={6} md={3} key={key}>
            <FormControl fullWidth>
              <InputLabel htmlFor="cols">{key}</InputLabel>
              <Input
                id={key}
                value={value}
                //value={new_state.axes_scale[0][0]}
                onChange={event => { op_data.[key] = event.target.value.split(",").map((x) => parseFloat(x)); this.setState({ op_data: op_data }); }}
                //onChange={event => this.setState({ cols: Math.min(Math.max(parseInt(event.target.value), 1), 12) })}
                aria-describedby="{key}-helper-text"
                inputProps={{
                  'aria-label': { key },
                  style: { textAlign: 'center' }
                }}
              />
              {/* <FormHelperText id="cols-helper-text">Max: 12</FormHelperText> */}
            </FormControl>
          </Grid>
        );
      }
      else if (typeof value === 'number') {
        render_obj.push(
          <Grid item xs={12} sm={6} md={3} key={key}>
            <FormControl fullWidth>
              <InputLabel htmlFor="cols">{key}</InputLabel>
              <Input
                id={key}
                value={value}
                //value={new_state.axes_scale[0][0]}
                onChange={event => { op_data.[key] = parseFloat(event.target.value); this.setState({ op_data: op_data }); }}
                //onChange={event => this.setState({ cols: Math.min(Math.max(parseInt(event.target.value), 1), 12) })}
                aria-describedby="{key}-helper-text"
                inputProps={{
                  'aria-label': { key },
                  style: { textAlign: 'center' }
                }}
              />
              {/* <FormHelperText id="cols-helper-text">Max: 12</FormHelperText> */}
            </FormControl>
          </Grid>
        );
      }
      else {
        render_obj.push(
          <Grid item xs={12} sm={6} md={3} key={key}>
            <FormControl fullWidth>
              <InputLabel htmlFor="cols">{key}</InputLabel>
              <Input
                id={key}
                value={value}
                //value={new_state.axes_scale[0][0]}
                onChange={event => { op_data.[key] = event.target.value; this.setState({ op_data: op_data }); }}
                //onChange={event => this.setState({ cols: Math.min(Math.max(parseInt(event.target.value), 1), 12) })}
                aria-describedby="{key}-helper-text"
                inputProps={{
                  'aria-label': { key },
                  style: { textAlign: 'center' }
                }}
              />
              {/* <FormHelperText id="cols-helper-text">Max: 12</FormHelperText> */}
            </FormControl>
          </Grid>
        );
      }
    });
    return render_obj;
  }

  render() {
    //console.log("Rendering OPEdit");
    const { classes } = this.props;
    const op_data = _.cloneDeep(this.state.op_data);
    return (
      <Fragment>
        <div style={{ padding: 20 }}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            {this.renderParams(op_data)}
            <Grid item></Grid>
          </Grid>
        </div>
        <Fab variant="extended" color="secondary" className={classes.loadFab} onClick={() => this.props.procData({ opEdit: { loadRequest: true } })}>
          <ArrowDownwardIcon className={classes.extendedIcon} />
          Load
        </Fab>
        <Fab variant="extended" color="secondary" className={classes.saveFab} onClick={() => this.props.procData({ opEdit: this.state.op_data })}>
          <ArrowUpwardIcon className={classes.extendedIcon} />
          Save
        </Fab>
      </Fragment>
    );
  }
}

OPEdit.propTypes = {
  classes: propTypes.object.isRequired,
  procData: propTypes.func.isRequired,
}

export default withStyles(styles)(OPEdit);