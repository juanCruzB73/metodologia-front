import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { taskStore } from '../../../store/taskStore';
import style from './modal.module.css';
import { ITask } from '../../../types/ITask';
import { useTask } from '../../../hooks/useTask';
import Swal from 'sweetalert2';

type Modal={
  onClosePopUp:VoidFunction;
}
const intialState:ITask={
  title:"",
  description:"",
  fechaLimite:"",
}
export const Modal:FC<Modal> = ({ onClosePopUp }) => {

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
    Swal.fire({
                title: 'Do you want to submit this?',
                text: 'continue?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, submit it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                  if(activeTask){
                    onUpdateTask(formValue);
                    onClosePopUp();
                  }else{
                    addTask(formValue);
                    onClosePopUp();
                  }
                }
            });
  }
  ;
  
  return (
    <div className={style.containerModal}>
        <div className={style.mainContainerPopUp}>
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
