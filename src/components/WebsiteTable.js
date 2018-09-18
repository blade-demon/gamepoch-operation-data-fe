import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import indigo from "@material-ui/core/colors/indigo";
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: indigo[300],
    color: theme.palette.common.white,
    borderRadius: "0",
    padding: "0",
    textAlign: "center"
  },
  body: {
    fontSize: 14,
    padding: 0,
    textAlign: "center"
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    borderRadius: "0"
  },
  table: {},
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

let id = 0;
function createData(
  title,
  pageviews,
  uniquePageViews,
  avgTimeOnPage,
  entrances,
  exitRate
) {
  id += 1;
  return {
    id,
    title,
    pageviews,
    uniquePageViews,
    avgTimeOnPage,
    entrances,
    exitRate
  };
}

// const data = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 1),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 2),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 4),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 5)
// ];

function WebsiteTable(props) {
  const { classes } = props;
  let dataArray = [];
  props.dataArray.map(data =>
    dataArray.push(
      createData(
        data[0],
        Number(data[1]).toFixed(2),
        Number(data[2]).toFixed(2),
        Number(data[3]).toFixed(2),
        Number(data[4]).toFixed(2),
        Number(data[5]).toFixed(2)
      )
    )
  );

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>网页标题</CustomTableCell>
            <CustomTableCell>网页浏览量</CustomTableCell>
            <CustomTableCell>唯一身份浏览量</CustomTableCell>
            <CustomTableCell>平均页面停留时间</CustomTableCell>
            <CustomTableCell>进入次数</CustomTableCell>
            {/* <CustomTableCell>跳出率</CustomTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataArray.map(n => {
            return (
              <TableRow className={classes.row} key={n.id}>
                <CustomTableCell component="th" scope="row">
                  {n.title}
                </CustomTableCell>
                <CustomTableCell numeric>{n.pageviews}</CustomTableCell>
                <CustomTableCell numeric>{n.uniquePageViews}</CustomTableCell>
                <CustomTableCell numeric>
                  {n.avgTimeOnPage + "s"}
                </CustomTableCell>
                <CustomTableCell numeric>{n.entrances}</CustomTableCell>
                {/* <CustomTableCell numeric>{n.exitRate + "%"}</CustomTableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

WebsiteTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WebsiteTable);
