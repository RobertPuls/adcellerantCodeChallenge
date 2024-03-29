// eslint-disable-next-line no-use-before-define
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { formatDate } from '../util/helpers';

// TODO: put this in types file because it's shared
interface AdData {
  date: string;
  source: string;
  product: string;
  clicks: number;
  id: string;
}

interface Props {
  clickData: AdData[]
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const DataTable = ({ clickData }: Props) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="data table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="center">Ad Source</TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clickData.map((row: AdData) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {formatDate(row.date)}
              </TableCell>
              <TableCell align="center">{row.source}</TableCell>
              <TableCell align="right">{row.product}</TableCell>
              <TableCell align="right">{row.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// class DataTable extends React.PureComponent<Props> {
//   render() {
//     const { clickData } = this.props;
//     return (
//       <TableContainer component={Paper}>
//         <Table size="small" aria-label="data table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell align="center">Ad Source</TableCell>
//               <TableCell align="right">Product</TableCell>
//               <TableCell align="right">Clicks</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {clickData.map((row: AdData) => {
//               console.log('row', row);
//               return (
//                 <TableRow key={`${row.date} ${row.source} ${row.product}`}>
//                   <TableCell component="th" scope="row">
//                     {formatDate(row.date)}
//                   </TableCell>
//                   <TableCell align="center">{row.source}</TableCell>
//                   <TableCell align="right">{row.product}</TableCell>
//                   <TableCell align="right">{row.clicks}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }
// }

export default DataTable;
