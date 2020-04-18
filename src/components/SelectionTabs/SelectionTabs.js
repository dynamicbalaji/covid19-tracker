import React, { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

import './SelectionTabs.css';

const SelectionTabs = () => {
    const [value, setValue] = useState(0);

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
        </div>
    );
}

export default SelectionTabs;