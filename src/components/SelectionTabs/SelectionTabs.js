import React, { useState, useEffect } from 'react';
import { Paper, Tabs, Tab, useTheme } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import './SelectionTabs.css';
import DataTable from '../DataTable/DataTable';
import {fetchTNData} from '../../api';

const SelectionTabs = () => {
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            setData(await fetchTNData());
        }
        fetchData();
    }, []);

    const handleChange = (event, newVal) => setValue(newVal);

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
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChange}
            >
                <DataTable value={value} index={0} dir={theme.direction} data={data} />
                <span value={value} index={1} dir={theme.direction}>
                    Item Two
                </span>
                <span value={value} index={2} dir={theme.direction}>
                    Item Three
                </span>
            </SwipeableViews>
        </div>
    );
}

export default SelectionTabs;