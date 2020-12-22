import React, { useState } from 'react'


import api from '../../utils/api';
import { Redirect, Link } from 'react-router-dom';

import {ReactComponent as LogoSvg} from '../../assets/img/logo.svg';
import {TextField, Button, Checkbox} from '@material-ui/core';

import './Login.css';

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
      const data = await api('auth/local').post(values);
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

  if (isLogged) {
    return (<Redirect to='/' />)
  }

  return (
      <div className="wrapper-login columns-center">
        <LogoSvg className="icon-logo"/>
        <form className="box-login columns-center">
          <TextField variant="outlined" label="username" ></TextField>
          <TextField variant="outlined" label="password" type="password" ></TextField>
          <div className="row-between">
            <a href="#">Forgot your password?</a>
            <div className="row">
              <p>Remember me?</p>
              <Checkbox name="forgot" title="remember me?" />
            </div>
          </div>
          <div className="line-100"></div>
          <Button variant="contained" >Login</Button>
        </form>
      </div>
  )
}
