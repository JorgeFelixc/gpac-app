import React, { useEffect, useState } from 'react';
import {
    TextField, 
    Button, 
    Checkbox, 
    Table, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TableBody,
    TableCell, 
    TablePagination,
    Paper
} from '@material-ui/core';

import './Market.css';
import { GetData } from '../../utils/util';
import Loader from '../../components/Loader';
import { Redirect, useHistory } from 'react-router-dom';
import { ColumnsType } from '../../interfaces/Utils/ColumnsType';
import { IUsuario } from '../../interfaces/Helpers/IUsuario';
import { ICandidate } from '../../interfaces/Helpers/ICantidate';
import WarningIcon from '@material-ui/icons/Warning';
import { useStateUser } from '../../components/Hooks/useGlobalHook';

export default function Market(_props:any){
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const history = useHistory();
    const { state, dispatch } = useStateUser(); 
    // fetch data
    useEffect(() => {
        // GetData('users', setUsers, setLoader);
        GetData('candidates', setCandidates);
    }, []);

    const columns: ColumnsType[] = [
        {
            key:'image',
            dataIndex: 'recruiter',
            title:'',
            noTitle: true,
            render: (record:IUsuario) => <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/anime_spirited_away_no_face_nobody-512.png" className="img-round" />
        },
        {
            key:'name',
            title:'Name',
            render: (record:ICandidate) => (
                <TableCell className="columns-center row-name name-padding"> 
                    <p><strong>{record.user.firstName} {record.user.lastName}</strong></p> 
                    <p>{record.title}</p>
                </TableCell>
                )
        },
        {
            key:'industry',
            dataIndex:'industry',
            title:'Industry',
        },
        {
            key:'title',
            dataIndex:'title',
            title:'Job Position',
        },
        {
            key:'phone',
            dataIndex:'user',
            title:'Phone',
            render: (record:IUsuario) => (
                <TableCell>
                    <p>{record.phone}</p>
                </TableCell>
            )
        },
        {
            key:'wishSalary',
            dataIndex:'wishSalary',
            title:'Salary',
            render: (record:number) =>(
                <TableCell>
                    <p>${record}</p>
                </TableCell>
                )
        },
        {
            key:'location',
            dataIndex:'location',
            title:'Location',
            render: (record:any) => (
                <TableCell>
                    <p>NJ</p>
                </TableCell>
            )
        },
        {
            key:'actions',
            title:'Actions',
            render: (record:ICandidate) => (
                <TableCell  className="columns-center row-action">
                    <Button variant="contained" className="btn-border" onClick={() => history.push(`/candidates/${record.id}`) }>View Profile</Button>
                </TableCell>
            )
        }
    ]

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
                    {
                        state.user &&
                        state.user.role.id === 1 ? 
                        <Button variant="contained" onClick={() => history.push('/candidates/new')}>Add new talent </Button>
                        :
                        ''

                    }
                </div>
            </div>

    
            <CustomTable dataSource={candidates} columns={columns} />

        </div>
    )
}

interface ICustomTable {
    dataSource: any[],
    columns: ColumnsType[],
}
function CustomTable({columns, dataSource}:ICustomTable){
    const [page, setPage ] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const buildHeaders = () => {
        return columns.map((item, index) => {
            if(item.noTitle){ return  }

            return <TableCell key={index}>{item.title}</TableCell>
        });
    }

    const buildRows = () => {
        return dataSource.map((value, key) => { 
            return (
                <TableRow className="body-table" key={key}>
                {               
                    columns.map((column, columnIndex) => { 
                        // If Render Exist render it first.
                        if(column.render){
                            if(column.dataIndex){
                                if(value[column.dataIndex]){
                                    return column.render(value[column.dataIndex]);
                                }
                            }
                            return column.render(value);
                        }
                        if(column.dataIndex){
                            if(value[column.dataIndex]){
                                return (
                                    <TableCell>
                                        <p>{value[column.dataIndex]}</p>
                                    </TableCell>
                                )
                            }
                        }
                        return;
                    })     
                }
                </TableRow>    
            )
        })
    }

    if(dataSource.length === 0){
        return (
            <div className="wrapper-notfound columns-center">
                <WarningIcon className="icon-notfound"/>
                <p className="text-notfound">No hay datos</p>
            </div>
        )
    }
    return(
        <>
        <TableContainer>
            <Table >
                <TableHead>
                    <TableRow className="header-table">

                        {buildHeaders()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {buildRows()}
                </TableBody>

            </Table>

            {/* </TablePagination>} */}
        </TableContainer>
        <TablePagination 
            component="div"
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5,10,25]}
            page={page}
            count={20}
            ActionsComponent="div"
            onChangeRowsPerPage={(e:React.ChangeEvent<HTMLInputElement>) => setRowsPerPage(parseInt(e.target.value, 10))}
            onChangePage={(_v:unknown, number:number) => {setPage(number)}}/>
        </>
    )
}

// Tabla vieja
function MarketTable(props:any){
    const history = useHistory();
    const ignoredHeaders = [ 
        "id",
        "password",
        "firstName",
        "lastName",
        "image",
        "functionalTitle",
        "key",        
    ]
    const [page, setPage ] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const buildHeaders = () => {
        if(!props.dataSource) {return};

        if(props.dataSource.length === 0) {return};

        // console.log("data source",props.dataSource);
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
        <>
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

            {/* </TablePagination>} */}
        </TableContainer>
        <TablePagination 
            component="div"
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5,10,25]}
            page={page}
            count={20}
            ActionsComponent="div"
            onChangeRowsPerPage={(e:React.ChangeEvent<HTMLInputElement>) => setRowsPerPage(parseInt(e.target.value, 10))}
            onChangePage={(_v:unknown, number:number) => {setPage(number)}}/>
        </>
    )
}