import { useEffect, useState } from 'react'
import './App.css'
import { IProyecto } from './types/IProyecto'
import {deleteProyecto, getProyectos } from './http/proyecto'
import { CreateEdit } from './CreateEdit'

export const App = ()=> {

  const [data,setData]=useState<IProyecto[]>([]);
  const [popUp,setPopUp]=useState(false);
  const [activeProyecto,setActiveProyecto]=useState<IProyecto|null>(null);

  const handleClosePopUp=()=>{
    setPopUp(false);
  }

  const handleDelete=async(id:string)=>{
    try{
        await deleteProyecto(id);
        const data =  await getProyectos();
        setData(data.proyectos);
    }catch(err){
      console.error(err);
    }
  };

  useEffect(()=>{
    const listProyects=async()=>{
      const data=await getProyectos();
      setData(data.proyectos)
    }
    listProyects()
  },[])

  

  return (
    <>
      <h1>Lista de Proyectos</h1>
      <button onClick={()=>{setActiveProyecto(null);setPopUp(true)}}>Agregar</button>
      <ul>
        {data.map((proyecto) => (
          <li key={proyecto.id}>{proyecto.nombre} <button onClick={()=>{setActiveProyecto(proyecto);setPopUp(true)}}>Editar</button> <button onClick={()=>handleDelete(proyecto.id!)}>Eliminar</button> </li>
        ))}
      </ul>
      {popUp?<CreateEdit onClosePopUp={handleClosePopUp } activeProyecto={activeProyecto} updateData={setData}/>:<></>}
    </>
  )
}
