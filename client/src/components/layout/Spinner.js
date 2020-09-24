import React, { Fragment } from 'react';
import spinner from './img/spinner.gif'

const Spinner = ({width='200px'}) => {
    return (
        <Fragment>
            <img
              src={spinner}
              style={{ width: `${width}`, margin: 'auto', display: 'block'}}
              alt='Loading...'
            />
        </Fragment>
    )
};

export default Spinner;