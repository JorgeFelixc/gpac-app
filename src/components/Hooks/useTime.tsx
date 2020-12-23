import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface IUseTime{
    cycle: number,
    format: string
}


export default function useTime({cycle = 100, format = 'HH:mm'}:IUseTime){
    const [time, setTime] = useState(moment().format(format))


    useEffect(() => {
        // Crea el intervalo 
        const intervalCounter = setInterval(() => setTime(moment().format(format)), cycle);
        return () => clearInterval(intervalCounter);
    }, [clearInterval, setInterval, cycle])

    return time;
}