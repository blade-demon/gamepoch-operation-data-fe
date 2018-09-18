import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  homeButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function CustomAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.homeButton}
            color="inherit"
            aria-label="Home"
            component={Link}
            to="/"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

CustomAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomAppBar);
