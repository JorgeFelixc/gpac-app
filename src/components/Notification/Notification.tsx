import React from 'react';

import './Notification.css';


interface INotification {
    type: 'success' | 'error' | 'warning' | string,
    text: string,
}
export default function Notification({type, text}:INotification){

    return(
        <div className={`box-notification ntf-${type}`}>
            <p>{text}</p>
        </div>
    )
}