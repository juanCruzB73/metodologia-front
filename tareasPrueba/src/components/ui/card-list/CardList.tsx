import { FC, useState } from 'react'
import { ITask } from '../../../types/ITask'
import styles from './cardList.module.css'
import { taskStore } from '../../../store/taskStore'
import { useTask } from '../../../hooks/useTask'
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';

type ICardList={
    task:ITask;
    onOpenPopUp:VoidFunction;
}

export const CardList:FC<ICardList> = ({task,onOpenPopUp}) => {

    const setActiveTask = taskStore((state)=>state.setActiveTask);
    const {onDeleteTask,}=useTask();
    const [sweetStatus,setSeetStatus]=useState(false);

    const handelOnDelete=()=>{
        Swal.fire({
            title: 'This task will be deleted!',
            text: 'Do you want to continue?',
            icon: 'warning',
            showCancelButton: true, // Show cancel button
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                onDeleteTask(task.id!); // Execute only if user confirms
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                );
            }
        });
    }

  return (
    <div className={styles.cardBody}>
        <div className={styles.carListButtonContainer}>
            <button onClick={handelOnDelete}><FaTrashCan /></button>
            <button onClick={()=>{onOpenPopUp();setActiveTask(task);}} ><FaPencilAlt /></button>
        </div>
        <div className={styles.carListInfoContainer}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.fechaLimite}</p>
        </div>
    </div>
  )
}
