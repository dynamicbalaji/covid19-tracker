import React from 'react';
import EjectRoundedIcon from '@material-ui/icons/EjectRounded';

import './Delta.css';

const Delta = ({ inpCnt, color, size }) => {
    return (
        <>
            <span className={`delta-data-${color} delta-data-${size}`}>
                <EjectRoundedIcon fontSize="small" className={`delta-data-${size} delta-data-icon-${size}`} />{inpCnt}{' '}
            </span>
        </>
    );
}

export default Delta;