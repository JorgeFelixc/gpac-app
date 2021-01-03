import React, { useEffect, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import api from './utils/api';

import './utils/responsive.css';
import Dashboard from './pages/Home/Dashboard';
import { useStateUser } from './components/Hooks/useGlobalHook';

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(localStorage.getItem('token') !== null);
  // const [isLogged, setIsLogged] = useState<boolean>(true);
  const [user, setUser] = useState<any>(undefined);

  const { state, dispatch } = useStateUser();

  useEffect(() => {
    AuthVerification();
  }, [])


  const handleLogin = (logged: boolean, user: any) => {
    setIsLogged(logged);

    if(dispatch){
      dispatch({
        type:'set_user',
        action: user,
      });
    }
    localStorage.setItem('user', JSON.stringify(user));
    
    setUser(user);

  }


  const AuthVerification = async () =>{ 
    try{
      const existToken = localStorage.getItem('token');
      if(!existToken){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }
  
      const auth_service = await api('user/me').get();
      if(dispatch){
        dispatch({
          type:'set_user',
          action: auth_service,
        });
      }
      console.log("servicio auth:", auth_service);
      const { statusCode, error } = auth_service;
      if(statusCode && statusCode === 401 || statusCode && statusCode === 403 || error){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLogged(false);
  
      }
    }
    catch(ex){ 
      console.log("error al auth");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLogged(false);
    }

  }



  const handleLogout = () => {
    setIsLogged(false)
    localStorage.clear()
  }

  return (
    <Router basename={'/gpac-app'}>
      <Switch>
        <Route exact path='/fashero'>
          <Home isLogged={isLogged} handleLogout={handleLogout} />
        </Route>
        <Route exact path='/login'>
          <Login isLogged={isLogged} handleLogin={handleLogin} />
        </Route>
        <Route exact path='/recover'>
          <div>
            Recover in progress...
          </div>
        </Route>
        <ProtectedRoute path='/' isAuthenticated={isLogged} component={() => <Home isLogged={isLogged} handleLogout={handleLogout} />} />
      </Switch>
    </Router>
  );
}

export default App;
