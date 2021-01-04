import React, { useEffect, useState } from 'react';
import { useHistory, useParams,  } from 'react-router-dom';
import {
    TextField,
    Button,
    Tabs,
    Tab,
    Snackbar,
} from '@material-ui/core';

import './Candidates.css';
import CandidateInfo from './CandidateInfo';
import { GetFormValues } from '../../utils/util';
import api from '../../utils/api';
import Notification from '../../components/Notification/Notification';


export default function Candidates(props:any){
    let params = useParams();
    const [selectedTab, setSelectedTab] = useState(0);
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [messageState, setMessageState] = useState({
        type:'success',
        text: 'Your data has been saved.',
    }) 
    const history = useHistory();


    useEffect(() => {
        console.log("id:", params);
    }, [])

    const buildTapsPanel = (indexValue: number) => {
        switch (indexValue) {
            case 0:
                return <CandidateInfo/>
                break;
            case 1:
                return <div className="box-candidate-info"></div>
                break;
            default:
                return <div className="box-candidate-info"></div>
                break;
        }
    }

    const onSendProfileData = async (params:any) => {
        console.log("parametros:", params)
        const user = {
            candidate: {
                ...params,
                location: JSON.stringify({
                    lat: Math.random() * 130 - 40,
                    long:    Math.random() * 130 - 40,
                }),
                user: {
                    firstName: params.firstName,
                    lastName: params.lastName,
                    email: params.email,
                    phone: params.phone,
                    image: '',
    
                }
            }
        };
        const saveService = await api('candidates').post(user);
        const { ok, error} =  saveService;
        setIsMessageOpen(true);
        if(ok){
            setMessageState({
                type:'success',
                text: 'Your data has been saved.',
            })
            history.push('/market');
            return;
        }
        setMessageState({
            type:'error',
            text:'Error saving your data'
        })
        console.log("Save Service:",saveService);
    }

    return(
        <div className="wrapper-content">
            <h1 className="icon-red">New Talent</h1>
            <div className="row-top">
                <div className="box-profile">
                    <img className="img-profile"  src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/anime_spirited_away_no_face_nobody-512.png"/>
                    <Button variant="contained" onClick={() => GetFormValues('candidate', onSendProfileData)}>Save as draft</Button>
                    <Button variant="contained">Save and send to couch</Button>
                    <Button variant="contained" className="btn-border">Discard</Button>
                </div>

                <div className="box-information">
                    <Tabs value={selectedTab} onChange={(e,i) => setSelectedTab(i)} aria-label="simple tabs example">
                        <Tab label="Profile"  />
                        <Tab label="Resume"  />
                        <Tab label="Item Three" />
                    </Tabs>
                    {buildTapsPanel(selectedTab)}

                </div>
            </div>
            <Snackbar open={isMessageOpen}  autoHideDuration={6000} onClose={() => setIsMessageOpen(false)}>
                <Notification type={messageState.type} text={messageState.text}/>
            </Snackbar>
        </div>
    )
}