import { IProyecto } from "../types/IProyecto";
import { v4 as uuidv4 } from 'uuid';

const API_URL = "http://localhost:3000/proyectoList";

export const createProyectController=async(newProyecto:IProyecto)=>{
    const id = uuidv4();
    const response=await fetch(API_URL);
    let responseJson = await response.json();
    newProyecto={...newProyecto,id:id};
    const data = [...responseJson.proyectos, newProyecto];
    responseJson.proyectos=data;
    return await fetch(`${API_URL}`,{method: "put",headers: { 'Content-Type': 'application/json' },body:JSON.stringify(responseJson)});
}
export const UpdateProyectController=async(newProyecto:IProyecto)=>{
    const response=await fetch(API_URL);
    let responseJson = await response.json();
    responseJson.proyectos = responseJson.proyectos.map((proyecto: IProyecto) => 
        proyecto.id === newProyecto.id ? newProyecto : proyecto
    );

    return await fetch(`${API_URL}`,{method: "put",headers: { 'Content-Type': 'application/json' },body:JSON.stringify(responseJson)});
}
export const DeleteProyectController=async(idProyecto:string)=>{
    
    const response=await fetch(API_URL);
    let responseJson = await response.json();
    
    responseJson.proyectos=responseJson.proyectos.filter((proyecto:IProyecto) => proyecto.id!==idProyecto);

    return await fetch(`${API_URL}`,{method: "put",headers: { 'Content-Type': 'application/json' },body:JSON.stringify(responseJson)});
}