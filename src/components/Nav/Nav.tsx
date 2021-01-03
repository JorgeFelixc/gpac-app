import React from 'react';

import { TextField, Select, MenuItem, Button } from '@material-ui/core';
import { ReactComponent as DropdownIcon } from '../../assets/img/dropdown.svg'
import { ReactComponent as AdnvancedMenuIcon } from '../../assets/img/menu.svg'
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Nav.css';
import { useStateUser } from '../Hooks/useGlobalHook';

interface INav {
    handleLogout():void, 
}

export default function Nav(props:INav){
    const { state, dispatch } = useStateUser();
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
            <Button className="circle btn-menu" tabIndex={5}>
                <MoreVertIcon className="icon-menu"/>
                <div className="wrapper-dropdown-menu columns">
                    <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/anime_spirited_away_no_face_nobody-512.png"  />
                    <h3>{state.user?.firstName} {state.user?.lastName} ({state.user?.role.description})</h3>
                    <p className="text-email">{state.user?.email}</p>
                    <div className="top-auto">
                        <Button variant="contained" className="btn-border" onClick={props.handleLogout}>Logout</Button>
                    </div>
                </div>
            </Button>

        </nav>
    )
}