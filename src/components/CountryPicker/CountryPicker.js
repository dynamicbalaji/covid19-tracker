import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import './CountryPicker.css';
import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange, value, index }) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCntrs = async () => {
            setCountries(await fetchCountries())
        }

        fetchCntrs();
    }, []);
    
    if (value !== index) return null;

    const cntryLst = countries ?
        countries.map((country, i) => <option value={country.name} key={i}>{country.name}</option>)
        : null;

    return (
        <FormControl className="cntry-container">
            <NativeSelect defaultValue="" onChange={e => handleCountryChange(e.target.value)}>
                <option value="" key="global">Global</option>
                {cntryLst}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;