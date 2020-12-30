import React, { useEffect } from 'react';

import './Map.css';
import * as Mapbox from 'mapbox-gl';
import {TextField, Button, Checkbox} from '@material-ui/core';


export default function Map(props:any){
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
                        testData.map(item => <CandidateBox {...item} />)
                    }
                </div>
                <MapContainer candidates={testData} />
            </div>
        </div>
    )
}


interface IMapContainer {
    candidates: ICandidateBox[],
}

function MapContainer({candidates}:IMapContainer){

    useEffect(() => {
        const map = new Mapbox.Map({
            container: 'map-container',
            style:'mapbox://styles/mapbox/streets-v11',
            accessToken: 'pk.eyJ1Ijoiam9yZ2VmYyIsImEiOiJja2phNTZqcHIwODVjMnJtYTNrMjlsN2VuIn0.iMOOrw5Jc5IaUqe2yW81ow'
        });



        const markerHeight = 50, markerRadius = 10, linearOffset = 25;
        // var popupOffsets = {
        // 'top': [0, 0],
        // 'top-left': [0,0],
        // 'top-right': [0,0],
        // 'bottom': [0, -markerHeight],
        // 'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        // 'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        // 'left': [markerRadius, (markerHeight - markerRadius) * -1],
        // 'right': [-markerRadius, (markerHeight - markerRadius) * -1]
        // };

        candidates.map(item => { 
            new Mapbox.Popup({ className: 'box-marker', closeOnClick:false, closeButton:false})
                .setLngLat(item.location)
                .setHTML(`<p>${item.name}</p>`)
                .setMaxWidth("300px")
                .addTo(map);    

        });
        // var popup = new Mapbox.Popup({ className: 'box-marker', closeOnClick:false, closeButton:false})
        //     .setLngLat([40.5, 50.5])
        //     .setHTML("<h1>Hello World!</h1>")
        //     .setMaxWidth("300px")
        //     .addTo(map);    
    }, [])

    return(
        <div id="map-container">

        </div>
    )
}


interface ICandidateBox{
    name:string,
    industry:string,
    title:string,
    location:Mapbox.LngLatLike,
    phone:string,
    address1:string,
    address2:string,    
}
function CandidateBox({name, industry, title, location, phone, address1, address2}:ICandidateBox){
    return(
        <div className="row-between box-candidate-location">
            <div>
                <p>{industry}</p>
                <h3>{name}</h3>
                <p>{title}</p>
            </div>
            <div>
                <p>{address1}</p>
                <p>{address2}</p>
                <p>{phone}</p>
            </div>
        </div>
    )
}



const testData: ICandidateBox[] = [
    {
        name: 'Aurora Coding',
        address1: 'Kearny Ny',
        address2: '54789',
        phone: '(123) 456 78 90',
        title: 'Development',
        industry: 'Company',
        location: [30.5, 50.5],
    },
    {
        name: 'Beijing Studio',
        address1: 'Kearny Ny',
        address2: '54789',
        phone: '(123) 456 78 90',
        title: 'Video Production',
        industry: 'Company',
        location: [30.5, 20.5],
    },
    {
        name: 'Marvel Studio',
        address1: 'Kearny Ny',
        address2: '54789',
        phone: '(123) 456 78 90',
        title: 'Development',
        industry: 'Company',
        location: [90.5, 30.5],
    },
    {
        name: 'Jonathan Doe',
        address1: 'Kearny Ny',
        address2: '54789',
        phone: '(123) 456 78 90',
        title: 'Engineer',
        industry: 'Talent',
        location: [1.5, 50.5],
    },
    {
        name: 'Kate Hotsonn',
        address1: 'Kearny Ny',
        address2: '54789',
        phone: '(123) 456 78 90',
        title: 'Baking Analyst',
        industry: 'Talent',
        location: [2.5, 90],
    },
    {
        name: 'Sr React Developer',
        address1: 'Kearny Ny',
        address2: '54789',
        phone: '(123) 456 78 90',
        title: 'Aurora Coding',
        industry: 'Talent',
        location: [34.5, 3.5],
    },
    {
        name: 'Aurora Coding',
        address1: 'Kearny Ny',
        address2: '54789',
        phone: '(123) 456 78 90',
        title: 'Development',
        industry: 'Company',
        location: [20.5, 9.5],
    },
    {
        name: 'Aurora Coding',
        address1: 'Kearny Ny',
        address2: '54789',
        phone: '(123) 456 78 90',
        title: 'Development',
        industry: 'Company',
        location: [30.5, 90],
    },
    {
        name: 'Aurora Coding',
        address1: 'Kearny Ny',
        address2: '54789',
        phone: '(123) 456 78 90',
        title: 'Development',
        industry: 'Company',
        location: [30.5, -50.5],
    },
    {
        name: 'Aurora Coding',
        address1: 'Kearny Ny',
        address2: '54789',
        phone: '(123) 456 78 90',
        title: 'Development',
        industry: 'Company',
        location: [-30.5, 50.5],
    },
]