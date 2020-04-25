import React from 'react';
import EjectRoundedIcon from '@material-ui/icons/EjectRounded';
import CountUp from 'react-countup';

import './Delta.css';

const Delta = ({ inpCnt, color, size }) => {
    return (
        <>
            <span className={`delta-data-${color} delta-data-${size}`}>
                <EjectRoundedIcon fontSize="small" className={`delta-data-${size} delta-data-icon-${size}`} />
                <CountUp start={0} end={inpCnt ? inpCnt : 0} duration={2.5} separator="," />{' '}
            </span>
        </>
    );
}

export default Delta;