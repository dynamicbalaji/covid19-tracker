import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, makeStyles, Typography } from '@material-ui/core';

import './DataTable.css';
import { getComparator, stableSort } from '../../utils';

const useStyles = makeStyles((theme) => ({
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const DataTable = ({ data }) => {
    const classes = useStyles();
    const [orderBy, setOrderBy] = useState('confirmed');
    const [order, setOrder] = useState('desc');
    const [lastUpdate, setLastUpdate] = useState('');

    const headCells = [
        { id: 'name', numeric: false, disablePadding: false, label: 'State/UT' },
        { id: 'confirmed', numeric: true, disablePadding: false, label: 'Confirmed' },
        { id: 'active', numeric: true, disablePadding: false, label: 'Active' },
        { id: 'recovered', numeric: true, disablePadding: false, label: 'Recovered' },
        { id: 'deaths', numeric: true, disablePadding: false, label: 'Deceased' }
    ];

    const tableData = !data.length ? (<Typography variant="button" display="block" align='center'>
        Loading...
        </Typography>) :
        stableSort(data, getComparator(order, orderBy))
            .map(({ stateName, confirmed, active, recovered, deaths, lastUpdated }) => {
                if (!lastUpdate) setLastUpdate(lastUpdated)
                return (
                    <TableRow key={stateName} hover>
                        <TableCell component="th" scope="row">
                            {stateName}
                        </TableCell>
                        <TableCell align="right">{confirmed}</TableCell>
                        <TableCell align="right">{active}</TableCell>
                        <TableCell align="right">{recovered}</TableCell>
                        <TableCell align="right">{deaths}</TableCell>
                    </TableRow>
                )
            });

    const lastUpdatedSec = lastUpdate ? (<Typography variant="caption" display="block" align='center'>
        Last Updated at {lastUpdate}
    </Typography>) : null;

    const handleSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    return (
        <div className="datatable-container">
            <Paper className="paper" elevation={3}>
                {lastUpdatedSec}
                <TableContainer>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'default'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            onClick={handleSort(headCell.id)}
                                            className="t-head"
                                        >
                                            {headCell.label}
                                            {orderBy === headCell.id ? (
                                                <span className={classes.visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </span>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default DataTable;