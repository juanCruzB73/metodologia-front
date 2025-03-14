import { taskStore } from "../store/taskStore";
import { ITask } from "../types/ITask";
import { getAllTasks,newTask,deleteTask,updateTask } from '../http/tarea';

export const useTask = ()=>{
    
    const setUpdateTask = taskStore((state)=>state.setUpdateTask);
    const setDeleteTask = taskStore((state)=>state.setDeleteTask);
    const setTaskArray = taskStore((state)=>state.setTaskArray);
    const setAddNewTask=taskStore((state)=>state.setAddNewTask);
    
    const getTasks=async()=>{
        const tasks = await getAllTasks();
        if (tasks) setTaskArray(tasks);
    };

    const addTask=async(task:ITask)=>{
        const data = await newTask(task);
        if(data){setAddNewTask(data);}
        return;
    }

    const onUpdateTask=async(task:ITask)=>{
        if(task.id == undefined)return;
        const data = await updateTask(task);
        if(data){setUpdateTask(data);}
        return;
    };

    const onDeleteTask=async(id:string)=>{
        await deleteTask(id);
        setDeleteTask(id);
        return;
    };

    return{
        getTasks,onUpdateTask,onDeleteTask,addTask,
    }

}