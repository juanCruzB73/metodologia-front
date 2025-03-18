import { useEffect, useState } from 'react';
import { taskStore } from '../../../store/taskStore'
import styles from './listTareas.module.css'

import { CardList } from '../card-list/CardList';
import { Modal } from '../modal/Modal';
import { useTask } from '../../../hooks/useTask';

export const ListTareas = () => {

    const tasks=taskStore((state)=>state.tasks);
    const {getTasks,onUpdateTask,onDeleteTask,addTask}=useTask()
    

    const [activePopUp,setActivePopUp]=useState(false);

    useEffect(()=>{
        getTasks();
    },[onUpdateTask,onDeleteTask,addTask])

    const handleOpenPopUp=()=>{
        setActivePopUp(true);
    };
    const handleClosePopUp=()=>{
        setActivePopUp(false);

    }

    return (
        <>
        <div className={styles.listTareasContainer}>
                <div className={styles.listTareasContainerTitle}>
                    <h2>Task's list</h2>
                    <button onClick={()=>handleOpenPopUp()}>Add task</button>
                </div>
                <div className={styles.listTareasContainerList}>
                    {
                        tasks.length>0?
                        (tasks.map(task=>(
                            <CardList key={task.id} task={task} onOpenPopUp={handleOpenPopUp}/>
                        ))):
                        (
                            <div>
                                <h3>no task at the moment</h3>
                            </div>
                        )
                    }
                </div>
        </div>
        {activePopUp && <Modal onClosePopUp={handleClosePopUp}/>}
        </>
    )
}
