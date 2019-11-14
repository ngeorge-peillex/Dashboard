import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 150,
    },
});

function createData(month, price) {
    return { month, price };
}

const rows = [
    createData('Janvier 2019', 159),
    createData('Fevrier 2019', 237),
    createData('Mars 2019', 262),
    createData('Avril 2019', 305),
    createData('Mai 2019', 356),
];

export default function SimpleTable() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>Price evolution</Title>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow fontWeight="fontWeightBold">
                            <TableCell>Month</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.month}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </React.Fragment>
    );
}