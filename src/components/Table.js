import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import blueGrey from "@material-ui/core/colors/blueGrey";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: blueGrey[500],
    color: theme.palette.common.white,
    borderRadius: "0",
    padding: "0"
  },
  body: {
    fontSize: 14,
    padding: "0"
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    borderRadius: "0"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

function createData(id, date, new_user, cancel_user, net_user, summary_user) {
  return { id, date, new_user, cancel_user, net_user, summary_user };
}

// let data = [
// createData(1, "07.08", 6.0, 24, 4.0, 1),
// createData(2, "07.07", 9.0, 37, 4.3, 222),
// createData(3, "07.06", 16.0, 24, 6.0, 33),
// createData(4, "07.05", 3.7, 67, 4.3, 444),
// createData(5, "07.04", 16.0, 49, 3.9, 555),
// createData(6, "07.03", 16.0, 49, 3.9, 6666),
// createData(7, "07.02", 16.0, 49, 3.9, 6666),
// createData(8, "07.01", 16.0, 49, 3.9, 6666)
// ];

function CustomizedTable(props) {
  const { classes } = props;
  // 按时间进行从新到旧排序
  props.dataArray.sort((a, b) => new Date(b.ref_date) - new Date(a.ref_date));
  let data = [];
  for (let i = 0; i < props.dataArray.length; i++) {
    data.push(
      createData(
        i + 1,
        props.dataArray[i].ref_date.substr(5, 5),
        props.dataArray[i].new_user,
        props.dataArray[i].cancel_user,
        props.dataArray[i].net_user,
        props.dataArray[i].cumulate_user
      )
    );
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.tableRow}>
            <CustomTableCell
              component="th"
              className={classes.tableCell}
              numeric
              paddingnone="true"
            >
              日期
            </CustomTableCell>
            <CustomTableCell
              className={classes.tableCell}
              numeric
              paddingnone="true"
            >
              新关注
            </CustomTableCell>
            <CustomTableCell
              className={classes.tableCell}
              numeric
              paddingnone="true"
            >
              取消关注
            </CustomTableCell>
            <CustomTableCell
              className={classes.tableCell}
              numeric
              paddingnone="true"
            >
              净增关注
            </CustomTableCell>
            <CustomTableCell
              className={classes.tableCell}
              numeric
              paddingnone="true"
            >
              用户总数
            </CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow className={classes.row} key={n.id}>
                <CustomTableCell
                  component="th"
                  scope="row"
                  paddingnone="true"
                  numeric
                >
                  {n.date}
                </CustomTableCell>
                <CustomTableCell numeric paddingnone="true">
                  {n.new_user}
                </CustomTableCell>
                <CustomTableCell numeric paddingnone="true">
                  {n.cancel_user}
                </CustomTableCell>
                <CustomTableCell numeric paddingnone="true">
                  {n.net_user}
                </CustomTableCell>
                <CustomTableCell numeric paddingnone="true">
                  {n.summary_user}
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
