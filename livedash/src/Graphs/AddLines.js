import React, { Component } from 'react';
import propTypes from 'prop-types';

import { available_signals } from '../helpers/available_signals';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export class AddLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render_revision: 0,
    }
  }

  selected = {};

  shouldComponentUpdate(nextProps, nextState) { // Limits re-renders
    return nextProps.show !== this.props.show || nextState.render_revision !== this.state.render_revision;
  }

  renderButtons = () => {
    const result = []
    Object.entries(available_signals).forEach(([key, value]) => {
      if (typeof value === 'object') {
        const filtered_array = [];
        Object.entries(value).forEach(([v_key, v_value]) => {
          if (v_value !== "DEBUG" && v_key !== 'logMonoTime') { // if ((typeof v_value === 'boolean' || typeof v_value === 'number') && v_key !== 'logMonoTime')
            filtered_array.push(<ToggleButton style={{textTransform: 'none', borderRadius: '0', minWidth: '40ch', maxHeight: '20px'}} value={v_key} key={v_key} aria-label={v_key}>{v_key}</ToggleButton>);
          }
        });
        result.push(
          <Accordion key={key}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1">{key}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ justifyContent: "center" }}>
            <ToggleButtonGroup orientation="vertical" value={this.selected.[key]} onChange={(event, signals) => {this.selected.[key] = signals ; this.setState({render_revision: this.state.render_revision + 1}); } } aria-label="lines selected">
                {filtered_array}
              </ToggleButtonGroup>
            </AccordionDetails>
          </Accordion>


        );
      }
    });
    return result;
  }

  render() {
    //console.log("Rendering AddLines");
    this.selected = this.props.prev_selection;
    return (
      <Dialog
        open={this.props.show}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          {this.renderButtons()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.setLogParams(this.selected)} color="primary">
            Save
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddLines.propTypes = {
  show: propTypes.bool.isRequired,
  prev_selection: propTypes.object.isRequired,
  setLogParams: propTypes.func.isRequired,
}