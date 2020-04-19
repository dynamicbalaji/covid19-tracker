import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';

import './Cards.css';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, value, index }) => {
    if (value !== index) return null;
    if (!confirmed) {
        return (<Typography variant="button" display="block" align='center'>
                    Loading...
                </Typography>);
    }
    return (
        <div className="card-container">
            <Typography variant="caption" display="block" align='center'>
                Last Updated at {new Date(lastUpdate).toLocaleString()}
            </Typography>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className="card-card card-infected">
                    <CardContent align='center'>
                        <Typography color="textSecondary" gutterBottom>Confirmed</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className="card-card card-recovered">
                    <CardContent align='center'>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className="card-card card-deaths">
                    <CardContent align='center'>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cards;