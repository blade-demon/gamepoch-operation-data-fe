import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    marginLeft: "0.5rem",
    marginRight: "0.5rem"
  }
});

class DatePickers extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    // console.log(this.props);

    return (
      <form className={classes.container} noValidate>
        <TextField
          label={this.props.startLabel}
          type="date"
          defaultValue={this.props.startDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
        <div>到</div>
        <TextField
          label={this.props.endLabel}
          type="date"
          defaultValue={this.props.endDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
    );
  }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePickers);
