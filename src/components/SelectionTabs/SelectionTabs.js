import React, { useState, useEffect } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
// import SwipeableViews from 'react-swipeable-views';

import './SelectionTabs.css';
import DataTable from '../DataTable/DataTable';
import Chart from '../Chart/Chart';
import CountryPicker from '../CountryPicker/CountryPicker';
import Cards from '../Cards/Cards';
import { fetchTNData, fetchTNGraphData, fetchIndiaData, fetchIndiaGraphData, fetchCntryData, fetchDailyData } from '../../api';

const SelectionTabs = () => {
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [country, setCountry] = useState('');
    // const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            setData(await fetchTNData());
        }
        fetchData();
        const fetchGraphData = async () => {
            setGraphData(await fetchTNGraphData());
        }
        fetchGraphData();
    }, []);

    const handleChange = (event, newVal) => {
        setValue(newVal);
        setCountry('');
        if (newVal === 0) {
            const fetchData = async () => {
                setData(await fetchTNData());
            }
            fetchData();
            const fetchGraphData = async () => {
                setGraphData(await fetchTNGraphData());
            }
            fetchGraphData();
        } else if (newVal === 1) {
            const fetchData = async () => {
                setData(await fetchIndiaData());
            }
            fetchData();
            const fetchGraphData = async () => {
                setGraphData(await fetchIndiaGraphData());
            }
            fetchGraphData();
        } else if (newVal === 2) {
            const fetchData = async () => {
                setData(await fetchCntryData());
            }
            fetchData();
            const fetchGraphData = async () => {
                setGraphData(await fetchDailyData());
            }
            fetchGraphData();
        }
    };

    const handleCountryChange = async (country) => {
        const retrievedData = await fetchCntryData(country);
        setData(retrievedData);
        setGraphData(retrievedData);
        setCountry(country);
    }

    return (
        <div className="tab-container">
            <Paper square className="tab-style">
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Tamil Nadu" />
                    <Tab label="India" />
                    <Tab label="World" />
                </Tabs>
            </Paper>
            {/* <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChange}
                className="swipe"
            > */}
            <DataTable value={value} index={0} data={data} />
            <Chart value={value} index={0} graphData={graphData} />
            <Cards data={data} value={value} index={1} />
            <DataTable value={value} index={1} data={data} />
            <Chart value={value} index={1} graphData={graphData} />
            <CountryPicker handleCountryChange={handleCountryChange} value={value} index={2} />
            <Cards data={data} value={value} index={2} />
            <Chart value={value} index={2} graphData={graphData} country={country} />
            {/* </SwipeableViews> */}
        </div>
    );
}

export default SelectionTabs;