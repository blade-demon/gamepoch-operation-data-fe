import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import Moment from "moment";
// import { extendMoment } from "moment-range";
// const moment = extendMoment(Moment);

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-end"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 80
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CustomSelect extends React.Component {
  state = {
    dateRange: 7,
    dateRangeLabel: "近7天"
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setDateRange(event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.dateRange}
            style={{ float: "right" }}
            onChange={this.handleChange}
            inputProps={{ name: "dateRange", id: "date-range" }}
          >
            <MenuItem value="7">
              <em>默认</em>
            </MenuItem>
            <MenuItem value={7}>近7天</MenuItem>
            <MenuItem value={30}>近30天</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomSelect);
