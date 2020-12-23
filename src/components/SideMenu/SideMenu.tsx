import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';



import { SideMenuData, ISideMenuData } from './SideMenuData';
import api from '../../utils/api';
import useWindowSize from '../Hooks/useWindowSize';
import { useStateUser } from '../Hooks/useGlobalHook';
import { ReactComponent as LogoSvg} from '../../assets/img/logo.svg';

import './SideMenu.css';
import moment from 'moment';
import useTime from '../Hooks/useTime';


const SideMenu = withRouter(({ location }) => {
  const [collapsed, setCollapse] = useState(false);
  const [userData, setUserData] = useState<any>();

  const size = useWindowSize();
  const time = useTime({cycle: 100, format:'HH:mm:ss'});
  const { state, dispatch} = useStateUser();

  useEffect(() => {
    GetUserData();
  }, [])

  useEffect(() =>  {
    // console.log("actualizando:", userData);
    GenerateMenu();
  }, [userData]);
  
  async function GetUserData(){ 
    const user_service = await api('users/me').get();
    if(user_service){
      // console.log(user_service);
      setUserData(user_service);
    }

  }

  
  function GenerateMenu(){ 
    return SideMenuData.map((item) => { 
      return BuildMenu(item);
    });
  }

  function BuildMenu(item: ISideMenuData){
    // if(userData){
    //   let type = userData.role.type;
    //   const filteredUsers = item.users.filter(res => res === type);
    //   if(filteredUsers.length == 0){
    //     return;
    //   }
    // }

    if(item.subMenu){
      let subItems = item.subMenu.map(subItem => {
        return BuildMenu(subItem);
      })

      return <MenuItem id={item.key} pathname={[location.pathname]}>
        {subItems.map(i => i)}
      </MenuItem>
    }




    return <MenuItem id={item.key} pathname={[location.pathname]}>
      <Link to={item.link}>
        {item.icon}
        <p>{item.title}</p>
      </Link>
    </MenuItem>

  }


  return (
    <aside className="wrapper-aside">
      <menu className="wrapper-menu" >
        <LogoSvg  className="logo-aside"/>
        {
          GenerateMenu()
        }

        <div className="box-hour">
          <p>{moment().format('ddd MMM Do')}</p>
          <p className="text-time">{time}</p>
          <p>Actual time</p>
        </div>
      </menu>
    </aside>

  )
});

export default SideMenu;


interface IMenuItem {
    id: string,
    pathname: string[],
    children: React.ReactNode
}

const MenuItem = ({id,pathname,children}:IMenuItem) => { 
  return(
    <div className={pathname.indexOf(id) !== -1 ? "box-aside-item aside-item-actived" : "box-aside-item"}>
      {children}
    </div>
  )
}

