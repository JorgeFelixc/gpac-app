import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';



import { SideMenuData, ISideMenuData } from './SideMenuData';
import api from '../../utils/api';
import useWindowSize from '../Hooks/useWindowSize';
import { useStateUser } from '../Hooks/useGlobalHook';
import { ReactComponent as LogoSvg} from '../../assets/img/logo.svg';

import './SideMenu.css';


const SideMenu = withRouter(({ location }) => {
  const [collapsed, setCollapse] = useState(false);
  const [userData, setUserData] = useState<any>();

  const size = useWindowSize();
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

      return <MenuItem icon={item.icon} title={item.title} key={item.key}>
        {subItems.map(i => i)}
      </MenuItem>
    }




    return <MenuItem icon={item.icon} title={item.title} key={item.key} >
      <Link to={item.link}>{item.title}</Link>
    </MenuItem>

  }


  // selectedKeys={[location.pathname]} 
  return (
    <aside className="wrapper-aside">
      <Menu selectedKeys={[location.pathname]}  >
        <LogoSvg  className="logo-aside"/>
        {
          GenerateMenu()
        }
      </Menu>
    </aside>

  )
});

export default SideMenu;


interface IMenu{
  selectedKey:string[],
}
const Menu = (props:any) =>  { 
  useEffect(() => {
    console.log("props:", props.selectedKeys);
    // console.log(props.children[1][0])
    React.Children.map(props.children, (child,index) => { 
      console.log(child);
      if(props.selectedKeys.indexOf(child.key) !== -1){
        React.cloneElement(child, {actived:true});
        // child.props['actived'] = true;
      }
    })
  }, [])
  
  return (
    <div className="wrapper-menu">
      {props.children}
    </div>
  )
}

const MenuItem = (props:any) => { 
  const DomMenu = useRef(null);
  // console.log("props menuitem:", props);
  return(
    <div key={props.key} ref={DomMenu}  className={props.actived ? "box-aside-item actived" : "box-aside-item"}>
      {props.icon}
      <p>{props.title}</p>
    </div>
  )
}

