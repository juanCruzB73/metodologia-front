import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { taskStore } from '../../../store/taskStore';
import style from './modal.module.css';
import { ITask } from '../../../types/ITask';
import { useTask } from '../../../hooks/useTask';

type Modal={
  popUpStatus:boolean;
  onOpenPopUp:VoidFunction;
  onClosePopUp:VoidFunction;
}
const intialState:ITask={
  title:"",
  description:"",
  fechaLimite:"",
}
export const Modal:FC<Modal> = ({ popUpStatus , onOpenPopUp, onClosePopUp }) => {

  const activeTask = taskStore((state)=>state.activeTask);
  const setActiveTask = taskStore((state)=>state.setActiveTask);
  const {onUpdateTask,addTask,}=useTask()
  
  const [formValue,setFormValue]=useState<ITask>(intialState);

  useEffect(()=>{
    if(activeTask){
      setFormValue(activeTask)
    }
  },[])

  const handleChange=(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value}=e.target;
    setFormValue((prev)=>({...prev,[`${name}`]:value})); 
  };
  const handleSubmit=(e:FormEvent)=>{
    e.preventDefault();
    if(activeTask){
      onUpdateTask(formValue);
    }else{
      addTask(formValue);
    }
    onClosePopUp();
  }
  ;
  
  return (
    <div className={style.containerModal}>
        <div >
          <div>
            <h3>{activeTask?"Edit task":"Create task"}</h3>
          </div>
          <form className={style.containerPopUp} onSubmit={handleSubmit}>
              <input type="text" onChange={handleChange} value={formValue.title} required autoComplete='off' name='title' placeholder='Enter title' />
              <textarea required onChange={handleChange} value={formValue.description} name='description' placeholder='Enter description'/>
              <input type="date" onChange={handleChange} value={formValue.fechaLimite} required autoComplete='off' name='fechaLimite' />
              <div className={style.buttonCards}>
                <button type='submit'>Submit</button>
                <button type='button' onClick={()=>{onClosePopUp();setActiveTask(null)}}>Cancelar</button>
              </div>
          </form>
        </div>
    </div>
  )
}
