import React from 'react';
import {TextField, Button, Checkbox} from '@material-ui/core';

export default function CandidateInfo(props:any){

    return(
        <div className="wrapper-candidate-info">

            <div className="grid-3x3">
                <TextField variant="outlined" placeholder="First Name" />
                <TextField variant="outlined" placeholder="Last Name"/>
                <TextField variant="outlined" placeholder="Status" />
                <TextField variant="outlined" placeholder="Wish Salary" />
                <TextField variant="outlined" placeholder="Functional Title" />
                <TextField variant="outlined" placeholder="Title" />
                <TextField variant="outlined" placeholder="Seniority" />
                <TextField variant="outlined" placeholder="Industry" />
                <TextField variant="outlined" placeholder="Location" />
                <TextField variant="outlined" placeholder="Phone" />
                <TextField variant="outlined" placeholder="Email" />
                <TextField variant="outlined" placeholder="Company" />
                <TextField variant="outlined" placeholder="Status for Process" />
                <TextField variant="outlined" placeholder="Relocation" />
            </div>
        </div>
    )
}