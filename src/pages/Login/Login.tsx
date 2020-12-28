import React, { useState } from 'react'


import api from '../../utils/api';
import { Redirect, Link } from 'react-router-dom';

import {ReactComponent as LogoSvg} from '../../assets/img/logo.svg';
import {TextField, Button, Checkbox} from '@material-ui/core';

import './Login.css';
import { GetFormValues } from '../../utils/util';

interface LoginProps {
  isLogged: boolean;
  handleLogin(logged: boolean, user?: any): void;
}


export default function Login({isLogged, handleLogin}: LoginProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const data = await api('user/auth').post(values);
      console.log(data);
      if (data.jwt) {
        localStorage.setItem('token', `Bearer ${data.jwt}`);
        handleLogin(true, data.user);
        setError(false);
      }

      setLoading(false);
      setError(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const onLogin = (params:any) => {
    console.log("Form params:", params);

  }


  if (isLogged) {
    return (<Redirect to='/' />)
  }

  return (
      <div className="wrapper-login columns-center">
        <LogoSvg className="icon-logo"/>
        <form className="box-login columns-center" autoComplete="off" noValidate >
          <TextField variant="outlined" label="Email" name="login" id="email" type="email" ></TextField>
          <TextField variant="outlined" label="Password" name="login" id="password" type="password" ></TextField>
          <div className="row-between">
            <a href="#">Forgot your password?</a>
            <div className="row">
              <p>Remember me</p>
              <Checkbox name="forgot" title="remember me?" />
            </div>
          </div>
          <div className="line-100"></div>
          <Button variant="contained" onClick={() => GetFormValues('login', onFinish)}>Login</Button>
        </form>
      </div>
  )
}
