import moment from "moment";
import { isArray, isNull } from "util";
import api from "./api";




export async function GetData(uri:string, callback:React.Dispatch<any> ,setLoader?: React.Dispatch<any>){ 
    try{
        if(setLoader){
            setLoader(true); 
        }
        console.log("mandar a:", uri);
        let data = await api(uri).get();
        console.log(`Trajo ${uri} on GetData: `, data);

        const {statusCode, error} = data;
        if(error){
            // if(error === "youre not logged"){
            //     window.location.href ="/";
            // }
            return;
        }

        if(isArray(data)){
            data = data.map((item:any,index:number) => { 
                return {
                    ...item,
                    key:index,
                }
            })
        }


    
        if(data){
            console.log("Hizo el callback");
            callback(data);
            return;
        }

    }
    catch(ex){
        console.error("No existe nada en el URI Mandado");
        return;
    }
    finally{
        if(setLoader){
            setLoader(false);
        }
    }

}





/**
 * 
 * @param res 
 * @param dateParam 
 * @param dateToFilter 
 */
export const FLT_Date = (res:any, dateParam: any) => {
    if(!dateParam){
        return true;
    }

    if(isNull(dateParam) || dateParam.length === 0){
        return true;
    }
    const initialDate = moment(dateParam[0]);
    const finalDate = moment(dateParam[1]);
    if(initialDate < moment(dateParam).utc(false) && moment(dateParam) < finalDate  ){

        return true;
    }

    return false;
}


export const FLT_EntradasDate = (res:any, dateParam: any) => {
    if(!dateParam ){
        return true;
    }
    if(!res["detalle-ventas"]){
        return false;
    }
    // console.log("RES:",res, moment(dateParam).format('YYYY-MM-DD'));
    const data = res["detalle-ventas"]
        .filter((fil:any) => {
            // console.log("Fecha:", moment(fil).format('YYYY-MM-DD') , moment(dateParam).format('YYYY-MM-DD')  )
            if(moment(fil.fechaVigencia).format('YYYY-MM-DD') === moment(dateParam).format('YYYY-MM-DD')){
                return true;
            }
            return false;
        });

    console.log("Resultado:", data);
    if(data.length > 0){
        return true;
    }


    return false;
}



export const GetFormValues = (formName:string, callback: Function) => {
    const formValues = document.getElementsByName(formName);
    let allCorrect = true;
    let formData:any = {};
    formValues.forEach((item:any) => { 
        switch (item.nodeName) {
            case 'SELECT':
                console.log("IM A SELECT IM NERVIUS");
                break;
        
            default:
                if(!item.id) break;
                if(!item.required){
                    formData[item.id] = item.value;
                    break;
                }

                if(item.required && item.value === ""){
                    allCorrect = false;
                    item.classList.add('wrong-value');
                    break;
                }
                item.classList.remove('wrong-value');
                formData[item.id] = item.value;
                break;
        }
        // console.log("item:", item.nodeName);
    });
    if(allCorrect){
        callback(formData);
        return;
    }

    console.error('Wrong values in your form');



}
