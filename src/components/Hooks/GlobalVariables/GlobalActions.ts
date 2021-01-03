import IGlobalState from "./IGlobalState";

export interface IGlobalActions{
    type: string,
    action: any,
}

export enum ActionType {
    SET_CONFIG_PROVIDER = 'set_config_provider',
    ACTIVE_MENU = "active_menu",
    DESACTIVE_MENU = "desactive_menu",
}

export type GlobalTypeActions = {type: ActionType.SET_CONFIG_PROVIDER } 


const GlobalActions = (state: IGlobalState, action:IGlobalActions): IGlobalState => { 
    switch(action.type){
        case 'set_config_provider':
            return{
                ...state,
            }
        case 'set_user':
            return{
                ...state,
                user: action.action,
            }
        default:
            return state;
    }
}


export default GlobalActions;

