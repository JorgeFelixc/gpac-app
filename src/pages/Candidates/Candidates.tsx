import React, { useEffect, useState } from 'react';
import { useParams,  } from 'react-router-dom';
import {
    TextField,
    Button,
    Tabs,
    Tab,
} from '@material-ui/core';

import './Candidates.css';
import CandidateInfo from './CandidateInfo';


export default function Candidates(props:any){
    let params = useParams();
    const [selectedTab, setSelectedTab] = useState(0);


    useEffect(() => {
        console.log("id:", params);
    }, [])

    const buildTapsPanel = (indexValue: number) => {
        switch (indexValue) {
            case 0:
                return <CandidateInfo/>
                break;
            case 1:
                return <div className="wrapper-candidate-info"></div>
                break;
            default:
                return <CandidateInfo/>
                break;
        }
    }

    return(
        <div className="wrapper-content">
            <h1 className="icon-red">New Talent</h1>
            <div className="row-top">
                <div className="box-profile">
                    <img className="img-profile"  src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/anime_spirited_away_no_face_nobody-512.png"/>
                    <Button variant="contained">Save as draft</Button>
                    <Button variant="contained">Save and send to couch</Button>
                    <Button variant="contained" className="btn-border">Discard</Button>
                </div>

                <div className="box-information">
                    <Tabs value={selectedTab} onChange={(e,i) => setSelectedTab(i)} aria-label="simple tabs example">
                        <Tab label="Item One"  />
                        <Tab label="Item Two"  />
                        <Tab label="Item Three" />
                    </Tabs>
                    {buildTapsPanel(selectedTab)}

                </div>
            </div>
        </div>
    )
}