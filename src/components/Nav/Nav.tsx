import React from 'react';

import { TextField, Select, MenuItem, Button } from '@material-ui/core';
import { ReactComponent as DropdownIcon } from '../../assets/img/dropdown.svg'
import { ReactComponent as AdnvancedMenuIcon } from '../../assets/img/menu.svg'
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Nav.css';

export default function Nav(props:any){
    return(
        <nav>
            <div className="row box-filters">
                <TextField variant="outlined" label="Quick Search..." />
                <div className="separator-vertical"></div>
                <Select label="All entities" variant="outlined" defaultValue="10" IconComponent={DropdownIcon} >
                    <MenuItem value="10">All Entities</MenuItem>
                    <MenuItem value="20">Private</MenuItem>
                </Select>
                <div className="separator-vertical"></div>
                <Select label="All entities" variant="outlined" defaultValue="10" IconComponent={DropdownIcon} >
                    <MenuItem value="10">All Entities</MenuItem>
                    <MenuItem value="20">Private</MenuItem>
                </Select>
                <div className="separator-vertical"></div>
                <Select label="All entities" variant="outlined" defaultValue="10" IconComponent={DropdownIcon} >
                    <MenuItem value="10">All Entities</MenuItem>
                    <MenuItem value="20">Private</MenuItem>
                </Select>
            </div>
            <Button variant="contained" className="btn-search btn-red" >
                <SearchIcon />
            </Button>

            <p className="text-advanced-seach left-auto">Advanced Search</p>
            <Button className="circle">
                <MoreVertIcon className="icon-menu"/>
                
            </Button>

        </nav>
    )
}