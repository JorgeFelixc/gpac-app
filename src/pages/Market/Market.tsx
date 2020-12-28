import React, { useEffect, useState } from 'react';
import {TextField, Button, Checkbox, Table, TableContainer, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';

import './Market.css';
import { GetData } from '../../utils/util';
import Loader from '../../components/Loader';
import { Redirect, useHistory } from 'react-router-dom';

export default function Market(props:any){
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);
    const history = useHistory();

    // fetch data
    useEffect(() => {
        GetData('users', setUsers, setLoader);
    }, []);




    // Loader..
    if(loader){
        return <div className="wrapper-loader">
            <Loader />
        </div>
    }

    return(
        <div className="wrapper-content">
            <div className="row">
                <h1 className="icon-red">Market</h1>
                <div className="wrapper-content-options left-auto">
                    <Button variant="contained" onClick={() => history.push('/candidates/new')}>Add new talent</Button>
                </div>
            </div>

            {
                users.length === 0 && 
                <div className="columns-center">
                    <h1>No hay datos</h1>
                </div>
            }
    
            <MarketTable dataSource={users} />

        </div>
    )
}

function MarketTable(props:any){
    const history = useHistory();
    const ignoredHeaders = [ 
        "id",
        "password",
        "email",
        "firstName",
        "lastName",
        "image",
        "functionalTitle",
        "key",        
    ]

    const buildHeaders = () => {
        if(!props.dataSource) {return};

        if(props.dataSource.length === 0) {return};

        console.log("data source",props.dataSource);
        const itemExample = props.dataSource[0];
        return Object.entries(itemExample).map((item, index) => { 
            if(ignoredHeaders.indexOf(item[0]) === -1){
                return <TableCell key={index}>{item[0]}</TableCell>
            }
            return;
        });

    }

    const buildRows = () => {
        if(!props.dataSource) {return};

        if(props.dataSource.length === 0) {return};

        return props.dataSource.map((item:any, index:any) => (
            <TableRow className="body-table" key={index} >
                <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/anime_spirited_away_no_face_nobody-512.png" className="img-round" />
                <TableCell key={index} className="columns-center row-name">
                    <p><strong>{item.firstName} {item.lastName}</strong></p>
                    <p>{item.title}</p>
                </TableCell>
                {
                    Object.entries(item).map((jitem:any,jindex) => {
                        // Ignora los headers que estan en la lista.
                        if(ignoredHeaders.indexOf(jitem[0]) === -1){
                            return <TableCell key={jindex} >
                                        {console.log("jitem:", jitem[1])}
                                        <p>{jitem[1] !== undefined ? jitem[1] : 'campo vacio.'}</p>
                                    </TableCell>
                        }
                        return;
                    })
                }
                <TableCell key={index} className="columns-center row-action">
                    <Button variant="contained" className="btn-border" onClick={() => history.push(`/candidates/${item.id}`) }>View Profile</Button>
                </TableCell>
            </TableRow>
        ))
    }
    return(
        <TableContainer>
            <Table >
                <TableHead>
                    <TableRow className="header-table">
                        <TableCell >name</TableCell>
                        {buildHeaders()}
                        <TableCell > </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {buildRows()}
                </TableBody>

            </Table>
        </TableContainer>
    )
}