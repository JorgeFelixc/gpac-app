import React, { useEffect, useState } from 'react';
import {
    TextField, 
    Button, 
    Checkbox,
    MenuItem,
    Select
} from '@material-ui/core';
import { ReactComponent as DropdownIcon } from '../../assets/img/dropdown.svg'

import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { ICandidate } from '../../interfaces/Helpers/ICantidate';

interface PropsCandidateInfo{
    candidate: ICandidate | undefined,
}

export default function CandidateInfo({candidate}:PropsCandidateInfo){

    useEffect(() => {
        if(candidate){
            const data = {
                ...candidate,
                ...candidate.user,
            }
            fillForm('candidate', data);
        }    
    }, [candidate])


    const fillForm = (name:string, objectValue: any) => {
        const formsChild = document.getElementsByName(name);
        formsChild.forEach((item:any) => { 
            if(!item.id){
                return;
            }
            // solving typescript troubles hehe
            const propertieValue = objectValue[item.id];
            console.log("algo:", item.id, propertieValue);
            if(propertieValue){
                item.value = propertieValue;
                item.nodeValue = propertieValue;
                item.textContent = propertieValue;
            }
        });
    }

    return(
        <div className="wrapper-candidate-info">

            <div className="grid-3x3 box-candidate-info">
                <div className="box-candidate-input">
                    <p>First Name</p>
                    <TextField  inputProps={{required:true}} name="candidate" id="firstName" variant="outlined" placeholder="First Name" />
                </div>
                <div>
                    <p>Last Name</p>
                    <TextField  inputProps={{required:true}} name="candidate" id="lastName" variant="outlined" placeholder="Last Name"/>
                </div>
                <div>
                    <p>Status</p>
                    <Select inputProps={{id:"status", required:true}} label="All entities" variant="outlined" name="candidate" id="status" defaultValue="0" IconComponent={DropdownIcon}  >
                        <MenuItem value="0">Available</MenuItem>
                        <MenuItem value="1">No Available</MenuItem>
                    </Select>
                    {/* <TextField name="candidate" id="status" variant="outlined" placeholder="Status" /> */}
                </div>
                <div>
                    <p>Wish Salary</p>
                    <TextField  inputProps={{required:true}} name="candidate" id="wishSalary" variant="outlined" placeholder="Wish Salary" />
                </div>
                <div>
                    <p>Functional Title</p>
                    <TextField  inputProps={{required:true}} name="candidate" id="functionalTitle" variant="outlined" placeholder="Functional Title" />
                </div>
                <div>
                    <p>Title</p>
                    <TextField  inputProps={{required:true}} name="candidate" id="title" variant="outlined" placeholder="Title" />
                </div>
                <div>
                    <p>Seniority</p>
                    <TextField  inputProps={{required:true}} name="candidate" id="seniority" variant="outlined" placeholder="Seniority" />
                </div>
                <div>
                    <p>Industry</p>
                    <TextField  inputProps={{required:true}} name="candidate" id="industry" variant="outlined" placeholder="Industry" />
                </div>
                <div>
                    <p>Location</p>
                    <TextField  inputProps={{required:true}} disabled={candidate ? true : false } name="candidate" id="location" variant="outlined" placeholder="Location" />
                </div>
                <div>
                    <p>Phone</p>
                    <TextField inputProps={{required:true}}  name="candidate" id="phone" variant="outlined" placeholder="Phone" />
                </div>
                <div>
                    <p>Email</p>
                    <TextField  inputProps={{required:true}} name="candidate" id="email" variant="outlined" placeholder="Email" />
                </div>
                <div>
                    <p>Company</p>
                    <Select inputProps={{id:"company", required:true}} label="All entities" variant="outlined" name="candidate"  defaultValue="0" IconComponent={DropdownIcon} >
                        <MenuItem value="0">Microsoft</MenuItem>
                        <MenuItem value="1">Tesla</MenuItem>
                    </Select>
                    {/* <TextField name="candidate" id="company" variant="outlined" placeholder="Company" /> */}
                </div>
                <div>
                    <p>Status process</p>
                    <Select inputProps={{id:"statusProcess", required:true}} label="All entities" variant="outlined" name="candidate"  defaultValue="0" IconComponent={DropdownIcon} >
                        <MenuItem value="0">Skilling</MenuItem>
                        <MenuItem value="1">Interviewing</MenuItem>
                    </Select>
                    {/* <TextField name="candidate" id="statusProcess" variant="outlined" placeholder="Status for Process" /> */}
                </div>
                <div>
                    <p>Relocation</p>
                    <Select inputProps={{id:"relocation", required:true}} label="All entities" variant="outlined" name="candidate"defaultValue="true" IconComponent={DropdownIcon} >
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </Select>
                    {/* <TextField name="candidate" id="relocation" variant="outlined" placeholder="Relocation" /> */}
                </div>
            </div>


            <div className="box-candidate-info">
                <h1>Attachmens</h1>

                <AttachBox name="resume" id={0} title="Resume" />
                <AttachBox name="coverLetter" id={0} title="Cover Letter" />
                <AttachBox name="portfolio" id={0} title="Portfolio" />
                <AttachBox name="reference" id={0} title="Reference Check" />
                <AttachBox name="feeAgreement" id={0} title="Fee Agreement" />
            </div>
            
            <div className="box-candidate-info">
                <h1>Notes</h1>
                <p>There's no notes. Do you want to add a new note?</p>
            </div>
        </div>
    )
}



interface IAttachBox {
    title:string,
    id: number,
    name: string,
}
function AttachBox(props:IAttachBox){
    const [fileData, setFileData] = useState<File | undefined>();

    const handleChangeValue = (params:React.ChangeEvent<HTMLInputElement>) => {
        if(!params.target.files){
            setFileData(undefined);
            return;
        }
        setFileData(params.target.files[0]);

    }

    return(
        <div className="box-attachment">
            <h4>{props.title}</h4>
            <div className="row">
                <p className="flex-auto">
                    {
                        fileData ? 
                        fileData.name
                        :
                        'No files here'
                    }
                </p>
                <input
                    className="no-view"
                    onChange={handleChangeValue}
                    accept="image/*"
                    id={props.name}
                    multiple
                    type="file"/>
                <label htmlFor={props.name}>
                    <Button variant="contained" className="btn-border" color="primary"  endIcon={<SaveAltIcon/>} component="span">
                    Upload new file
                    </Button>
                </label>
                <Button variant="contained" className="width-initial" color="primary">
                    Upload
                </Button>

            </div>
        </div>
    )
}