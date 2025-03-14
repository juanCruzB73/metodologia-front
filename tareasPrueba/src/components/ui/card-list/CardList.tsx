import { FC } from 'react'
import { ITask } from '../../../types/ITask'
import styles from './cardList.module.css'
import { taskStore } from '../../../store/taskStore'
import { useTask } from '../../../hooks/useTask'


type ICardList={
    task:ITask;
    onOpenPopUp:VoidFunction;
}

export const CardList:FC<ICardList> = ({task,onOpenPopUp}) => {

    const setActiveTask = taskStore((state)=>state.setActiveTask);
    const {onDeleteTask,}=useTask();
    

  return (
    <div>
        <div>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.fechaLimite}</p>
        </div>
        <div>
            <button onClick={()=>onDeleteTask(task.id!)}>Delete</button>
            <button onClick={()=>{onOpenPopUp();setActiveTask(task);}} >Edit</button>
        </div>
    </div>
  )
}
