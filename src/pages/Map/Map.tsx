import React, { useEffect } from 'react';

import './Map.css';
import * as Mapbox from 'mapbox-gl';

export default function Map(props:any){
    return(
        <div>
            <h1>Hello</h1>

            <MapContainer />
        </div>
    )
}


function MapContainer(props:any){

    useEffect(() => {
        // Mapbox.accessToken = 'sk.eyJ1Ijoiam9yZ2VmYyIsImEiOiJja2phNTlvc2owNTFjMnVudXg0NGw1ZXZ1In0.FPFDml6--Rpuenf9_XcJOw';
        const map = new Mapbox.Map({
            container: 'map-container',
            style:'mapbox://styles/mapbox/streets-v11',
            accessToken: 'pk.eyJ1Ijoiam9yZ2VmYyIsImEiOiJja2phNTZqcHIwODVjMnJtYTNrMjlsN2VuIn0.iMOOrw5Jc5IaUqe2yW81ow'
        });
    }, [])

    return(
        <div id="map-container">

        </div>
    )
}