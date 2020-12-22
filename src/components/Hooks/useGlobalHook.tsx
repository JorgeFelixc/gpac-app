import React, { useReducer, createContext, useContext } from 'react';
import IGlobalState from '../../interfaces/Helpers/IGlobalState';
import GlobalActions, { IGlobalActions } from './GlobalVariables/GlobalActions';
import GlobalState from './GlobalVariables/GlobalState';


export interface Store{ 
    state: IGlobalState,
    dispatch?: React.Dispatch<IGlobalActions>
}


export const UserContext = createContext<Store>({state: GlobalState});
interface IUserProvider {
    initialState:IGlobalState,
    children: any,
    // GlobalActions(state:IGlobalState, action:IAction): IGlobalState,
}

export const UserProvider = (props:IUserProvider) => {
    const [state, dispatch] = useReducer(GlobalActions, props.initialState)
    return (
        <UserContext.Provider value={{state, dispatch}}>
            {props.children}
        </UserContext.Provider>
    );
    
}

export const useStateUser = () => useContext(UserContext);
