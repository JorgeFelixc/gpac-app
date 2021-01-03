import { IUsuario } from "./IUsuario";

export interface ICandidate {
    id:number,
    wishSalary:number,
    title:string,
    functionalTitle: string,
    company: string,
    seniority: string,
    industry:string,
    relocation:boolean,
    statusProcess:number,
    location:string,
    user: IUsuario,
    recruiter: IUsuario,
}