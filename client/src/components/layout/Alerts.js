import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {

    const alertContext = useContext(AlertContext);
    return (
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
            <div className='w-full flex justify-center h-20'>
                <div key={alert.id} className={`bg-red-200 w-2/3 mb-5 m-auto rounded ${alert.type}`}>
                    <i>⚠ {alert.msg}</i>
                </div>
            </div>
        ))
    )
}

export default Alerts;