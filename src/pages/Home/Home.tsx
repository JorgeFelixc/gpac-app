import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import SideMenu from '../../components/SideMenu/SideMenu'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';


import { ISideMenuData, SideMenuData } from '../../components/SideMenu/SideMenuData';
import Dashboard from './Dashboard';
import { useStateUser } from '../../components/Hooks/useGlobalHook';

import Loader from '../../components/Loader';
import Nav from '../../components/Nav/Nav';

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
            {
              // Renderizando todos los Protected Routes.
              GetProtectedRoutes(SideMenuData)
            }
            <Route path='/dashboard'>
               <Dashboard />  
            </Route>

          </Switch>
      </section>
    </div>


  )
}
{/* <Layout className="site-layout" >
<Header className="site-layout-background" >
  <MenuUnfoldOutlined className="icon-open-nav" onClick={handleOpenMenu} style={{fontSize:'25px'}} />
  <Row justify='end' style={{marginLeft:'auto'}}>
    <Col style={{  paddingRight: 24 }}>
      <Dropdown overlay={userMenu} trigger={['click']}>
        <a onClick={e => e.preventDefault()}>
          <Avatar style={{ backgroundColor: '#00a2ae', marginRight: 15 }}>{user.name.charAt(0)}</Avatar>{user.name} {user.lastname} <DownOutlined />
        </a>
      </Dropdown>

    </Col>
  </Row>
</Header>
<Content style={{ margin: '0 16px' }}>

</Content>
<Footer style={{ textAlign: 'center' }}>Departamento de Desarrollo Tecnológico y Sistemas </Footer>
</Layout> */}