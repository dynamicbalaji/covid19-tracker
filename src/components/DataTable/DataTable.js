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

const DataTable = ({ data, value, index }) => {
    const classes = useStyles();
    const [orderBy, setOrderBy] = useState('confirmed');
    const [order, setOrder] = useState('desc');
    // const [lastUpdate, setLastUpdate] = useState('');
    let firstLabel = 'District', lastUpdate ='';

    if (value !== index) return null;

    if (index === 1) {
        firstLabel = 'State/UT';
        lastUpdate = '';
    } else if (index === 2) {
        firstLabel = 'Country';
        lastUpdate = '';
    }

    const headCells = [
        { id: 'name', numeric: false, disablePadding: false, label: firstLabel },
        { id: 'confirmed', numeric: true, disablePadding: false, label: 'Confirmed' },
        { id: 'active', numeric: true, disablePadding: false, label: 'Active' },
        { id: 'recovered', numeric: true, disablePadding: false, label: 'Recovered' },
        { id: 'deaths', numeric: true, disablePadding: false, label: 'Deceased' }
    ];

    const tableData = data && !data.length ? (
        <TableRow>
            <TableCell align="center" colSpan={5}>
                <Typography variant="button" display="block" align='center'>
                    Loading...
                </Typography>
            </TableCell>
        </TableRow>) :
        stableSort(data, getComparator(order, orderBy))
            .map(({ stateName, confirmed, active, recovered, deaths, lastUpdated }) => {
                if (!lastUpdate) lastUpdate = lastUpdated;
                return (
                    <TableRow key={stateName} hover>
                        <TableCell component="th" scope="row" className="table-cell">
                            {stateName}
                        </TableCell>
                        <TableCell align="right" className="table-cell">{confirmed}</TableCell>
                        <TableCell align="right" className="table-cell">{active}</TableCell>
                        <TableCell align="right" className="table-cell">{recovered}</TableCell>
                        <TableCell align="right" className="table-cell">{deaths}</TableCell>
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
                                        className="table-cell">
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