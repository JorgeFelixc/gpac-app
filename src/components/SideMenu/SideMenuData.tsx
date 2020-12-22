import React from 'react';

import Dashboard from '../../pages/Home/Dashboard';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import {
  DashboardOutlined,
  AccessAlarm,

} from '@material-ui/icons'

export interface ISideMenuData {
    key: string;
    link: string;
    icon?: any,
    title: string,
    users: Array<'authenticated' | 'checador' | 'accesoapp' | 'auxiliar'>,
    subMenu?: Array<ISideMenuData>,
    component?: React.ComponentClass | React.FunctionComponent,
}


export const SideMenuData:Array<ISideMenuData> =[ 
  {
    key:'/market',
    link:'/market',
    icon: <DashboardOutlined/>,
    title:'Market',
    users: ["authenticated"],
  },
  {
    key:'/fashero',
    link:'/fashero',
    icon: <AccessAlarm/>,
    title:'Market',
    users: ["authenticated"],
  },
  {
    key:'/market',
    link:'/market',
    icon: <DashboardOutlined/>,
    title:'Market',
    users: ["authenticated"],
  },
  {
    key:'/market',
    link:'/market',
    icon: <DashboardOutlined/>,
    title:'Market',
    users: ["authenticated"],
  },
  {
    key:'/market',
    link:'/market',
    icon: <DashboardOutlined/>,
    title:'Market',
    users: ["authenticated"],
  },
  {
    key:'/market',
    link:'/market',
    icon: <DashboardOutlined/>,
    title:'Market',
    users: ["authenticated"],
  },
]
