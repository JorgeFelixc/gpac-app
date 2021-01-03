export interface IUsuario{
    id:number,
    firstName: string,
    lastName:string,
    role:{
        id:number,
        description:string,
    },
    status:{
        id:number,
        description:string,
    },
    phone:string,
    email:string,
    image:string,
}