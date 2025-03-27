import { ChangeEvent, FC, FormEvent, SetStateAction, useEffect, useState } from "react";
import { IProyecto } from "./types/IProyecto"
import { createNewProyecto, updateProyecto, getProyectos } from './http/proyecto'

const intialState:IProyecto={
    nombre:"",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    miembros: [],
}
/*const intialStateMiembro:IProyecto={
    nombre:"",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    miembros: [],
}*/
type Modal = {
    onClosePopUp: VoidFunction;
    activeProyecto:IProyecto|null;
    updateData: any;
  };
export const CreateEdit: FC<Modal> = ({ onClosePopUp,activeProyecto,updateData }) => {
    
    const [formValue, setFormValue] = useState<IProyecto>(intialState);
    //const [formValueMiembro, setFormValueMiembro] = useState<IProyecto>(intialState);

    const handleCrate=async(newProyecto:IProyecto)=>{
        try{
          await createNewProyecto(newProyecto);
          const data = await getProyectos();
          updateData(data.proyectos);
        }catch(err){
          console.error(err);
        }
      };
    
      const handleUpdate=async(newProyecto:IProyecto)=>{
        try{
            await updateProyecto(newProyecto);
            const data = await getProyectos();
            
            updateData(data.proyectos);
        }catch(err){
          console.error(err);
        }
      };
    
      

    const handleChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        
        const {name,value}=e.target;
        setFormValue((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault();
        if(activeProyecto){
            handleUpdate(formValue);
            onClosePopUp()
        }else{
            handleCrate(formValue);
            onClosePopUp()
        }
    }

    useEffect(() => {
        if (activeProyecto) {
          setFormValue(activeProyecto);
        } else {
          setFormValue(intialState);
        }
      }, [activeProyecto]);

    return (
      <div>
       <form style={{ backgroundColor: "red", padding: "20px", borderRadius: "8px" }} onSubmit={handleSubmit}>
        <input type="text" name="nombre" value={formValue.nombre} onChange={handleChange} placeholder="nombre"/>
        <input type="text" name="descripcion" value={formValue.descripcion} onChange={handleChange} placeholder="descripcion"/>
        <input type="date" name="fechaInicio" value={formValue.fechaInicio} onChange={handleChange}/>
        <input type="date" name="fechaFin" value={formValue.fechaFin} onChange={handleChange}/>
        <button type="submit">enviar</button>
        <button type="button" onClick={()=>onClosePopUp()}>cancelar</button>
        {/*<input type="text" value={formValue.miembros.nombre} placeholder="nombre miembro"/>
        <input type="text" placeholder="rol miembro"/>*/}
        </form> 
      </div>
    )
}