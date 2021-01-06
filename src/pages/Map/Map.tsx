import React, { useEffect, useState } from 'react';

import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as Mapbox from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import {TextField, Button, Checkbox} from '@material-ui/core';
import { ICandidate } from '../../interfaces/Helpers/ICantidate';
import { GetData } from '../../utils/util';
import Loader from '../../components/Loader';


export default function Map(props:any){
    const [candidate, setCandidates] = useState<ICandidate[]>([])
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        GetData('candidates', setCandidates, setLoader);
    }, [])

    return(
        <div>
            <div className="row box-map-options">
                <p>Show only: </p>
                <div className="row">
                    <p>  Alphas</p>
                    <Checkbox name="forgot" title="Alphas" />
                </div>
                <div className="row">
                    <p>Job Orders</p>
                    <Checkbox name="forgot" title="Job Orders" />
                </div>
                <div className="row">
                    <p>Companies</p>
                    <Checkbox name="forgot" title="Companies" />
                </div>
            </div>
            <div className="row-top">
                <div className="wrapper-candidate-location">
                    {
                        loader &&
                        <div className="wrapper-loader">
                            <Loader />
                        </div>
                    }
                    {
                        candidate &&
                        candidate.map(item => <CandidateBox candidate={item} />)
                    }
                </div>
                <MapContainer candidates={candidate} />
            </div>
        </div>
    )
}


interface IMapContainer {
    candidates: ICandidate[],
}

function MapContainer({candidates}:IMapContainer){
    let map: Mapbox.Map;
    useEffect(() => {

        if(!map){
            map = new Mapbox.Map({
                container: 'map-container',
                style:'mapbox://styles/mapbox/streets-v11',
                accessToken: 'pk.eyJ1Ijoiam9yZ2VmYyIsImEiOiJja2phNTZqcHIwODVjMnJtYTNrMjlsN2VuIn0.iMOOrw5Jc5IaUqe2yW81ow'
            });
        }

        map.resize();
        candidates.map(item => { 
            const LngLat = JSON.parse(item.location);
            new Mapbox.Popup({ className: 'box-marker', closeOnClick:false, closeButton:false})
                .setLngLat([LngLat.lat, LngLat.long])
                .setHTML(`<p>${item.user.firstName} ${item.user.lastName}</p>`)
                .setMaxWidth("300px")
                .addTo(map);    

        });

    }, [candidates])

    return(
        <div id="map-container">

        </div>
    )
}


interface ICandidateBox{
    candidate:ICandidate
}
function CandidateBox({candidate}:ICandidateBox){
    return(
        <div className="row-between box-candidate-location">
            <div>
                <p>{candidate.industry}</p>
                <h3>{candidate.user.firstName} {candidate.user.lastName}</h3>
                <p>{candidate.title}</p>
            </div>
            <div>
                <p>NJ</p>
                <p>54789</p>
                <p>{candidate.user.phone}</p>
            </div>
        </div>
    )
}

