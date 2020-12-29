import React from 'react';

import Dashboard from '../../pages/Home/Dashboard';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Map from '../../pages/Map/Map';
import {
  DashboardOutlined,
  AccessAlarm,

} from '@material-ui/icons'
import Market from '../../pages/Market/Market';

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
    key:'/dashboard',
    link:'/dashboard',
    icon: <DashboardOutlined/>,
    title:'Dashboard',
    users: ["authenticated"],
  },
  {
    key:'/job_orders',
    link:'/job_orders',
    icon: <AccessAlarm/>,
    title:'Job Orders',
    users: ["authenticated"],
  },
  {
    key:'/market',
    link:'/market',
    icon: <DashboardOutlined/>,
    title:'Market',
    users: ["authenticated"],
    component: Market
  },
  {
    key:'/companies',
    link:'/companies',
    icon: <DashboardOutlined/>,
    title:'Companies',
    users: ["authenticated"],
  },
  {
    key:'/s_projects',
    link:'/s_projects',
    icon: <DashboardOutlined/>,
    title:'S. Projects',
    users: ["authenticated"],
  },
  {
    key:'/map',
    link:'/map',
    icon: <DashboardOutlined/>,
    title:'Map',
    component: Map,
    users: ["authenticated"],
  },
  {
    key:'/tasks_tool',
    link:'/tasks_tool',
    icon: <DashboardOutlined/>,
    title:'Tasks Tool',
    users: ["authenticated"],
  },
  {
    key:'/sendouts',
    link:'/sendouts',
    icon: <DashboardOutlined/>,
    title:'Sendouts',
    users: ["authenticated"],
  },
]
