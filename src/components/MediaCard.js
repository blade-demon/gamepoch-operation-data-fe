import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  cardContainer: {},
  card: {
    display: "flex",
    margin: "2rem 1rem",
    alignItems: "center"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "5rem",
    height: "5rem",
    padding: "0"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

class MediaControlCard extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.cardContainer} onClick={this.props.onClick}>
        <Card className={classes.card}>
          <CardMedia className={classes.cover} image={this.props.coverImage} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">{this.props.title}</Typography>
              <Typography variant="subheading" color="textSecondary">
                {this.props.subtitle}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
