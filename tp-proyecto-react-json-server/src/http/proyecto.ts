import { createProyectController, DeleteProyectController, UpdateProyectController } from "../data/proyectoController";
import { IProyecto } from "../types/IProyecto";

const API_URL = "http://localhost:3000/proyectoList";


export const getProyectos = async()=>{
    try{
        const response=await fetch(API_URL)
        return response.json();
    }catch(error){
        console.error(error);
    }
};

export const createNewProyecto  = async(newProyecto:IProyecto)=>{
    try{
        return await createProyectController(newProyecto);
    }catch(error){
        console.error(error);
    }
};

export const updateProyecto = async(newProyecto:IProyecto)=>{
    try{
        console.log("update fired");
        return await UpdateProyectController(newProyecto);
    }catch(error){
        console.error(error);
    }
};
export const deleteProyecto = async(ProyectoToDelete:string)=>{
    try{
        return DeleteProyectController(ProyectoToDelete);
    }catch(error){
        console.error(error);
    }
};