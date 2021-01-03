import { IUsuario } from "../../../interfaces/Helpers/IUsuario";

export default interface IGlobalState{
    notifications: [],
    isMenuOpen:boolean,
    user?:IUsuario ,

}