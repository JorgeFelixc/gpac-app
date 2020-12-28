import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import SideMenu from '../../components/SideMenu/SideMenu'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';


import { ISideMenuData, SideMenuData } from '../../components/SideMenu/SideMenuData';
import Dashboard from './Dashboard';
import { useStateUser } from '../../components/Hooks/useGlobalHook';

import Loader from '../../components/Loader';
import Nav from '../../components/Nav/Nav';
import Candidates from '../Candidates/Candidates';

interface HomeProps {
  isLogged: boolean;
  handleLogout(): void;
}


export default function Home({ isLogged, handleLogout }: HomeProps) {
  const [user, setUser] = useState<any | undefined>(undefined)
  const {state, dispatch } = useStateUser();


  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      setUser(JSON.parse(user));
    }
  }, [])



  // if (!user) {
  //   return (<div className="wrapper-loader columns-center"><Loader/></div>)
  // }

  // Metodos para Crear las rutas Protejidas.
  // Lo que hace es construir con el schema de ISideMenuData, todos los links que se van a usar.
  const GetProtectedRoutes = (arrayData:Array<ISideMenuData>) => { 
    return arrayData.map((res,index) => buildProtectedRoutes(res, index));
  }

  const buildProtectedRoutes = (menuData:ISideMenuData, key:any):any => { 

    
    if(menuData.subMenu){
      return menuData.subMenu.map(item => {
        if(!item.component){
          return undefined
        }
        return buildProtectedRoutes(item, key);
      })
    }
    
    return <ProtectedRoute key={key} isAuthenticated={isLogged} authenticationPath='/login' path={menuData.link} component={menuData.component} />
  }

  return (
    <div className="wrapper-main">
      <SideMenu />
      <section style={{flex:1}}>
        <Nav />

        <Switch>
            <Redirect exact from='/' to='/market' />
            
            { GetProtectedRoutes(SideMenuData) // Renderizando todos los Protected Routes de SideMenuData.  
            }

            <ProtectedRoute isAuthenticated={isLogged} authenticationPath='/login' path="/candidates/:id" component={Candidates} />
            <Route path='/dashboard'>
               <Dashboard />  
            </Route>

          </Switch>
      </section>
      <footer className="row">
          <p>GPAC Directory v0.1 - 2019</p>
          <ul className="left-auto list-footer">
            <li>Help</li>
            <li>Turotials</li>
            <li>Support</li>
            <li>FAQ's</li>
          </ul>
      </footer>
    </div>


  )
}
