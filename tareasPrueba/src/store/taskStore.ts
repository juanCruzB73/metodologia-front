import { create } from "zustand";
import { ITask } from "../types/ITask";

interface ITaskStore{
    tasks:ITask[];
    activeTask:ITask|null;
    setActiveTask:(activeTask:ITask|null)=>void;
    setTaskArray:(taskArray:ITask[])=>void;
    setAddNewTask:(newTask:ITask)=>void;
    setUpdateTask:(updatedTask:ITask)=>void;
    setDeleteTask:(taskId:string)=>void;
}


export const taskStore=create<ITaskStore>((set)=>({
    //variables
    tasks:[],
    activeTask:null,
    //methods
    setActiveTask:(activeTaskIn)=>set(()=>({activeTask:activeTaskIn})),
    setTaskArray:(taskArrayIn)=>set(()=>({tasks:taskArrayIn})),
    setAddNewTask:(newTaskIn)=>set((state)=>({tasks:{...state.tasks,newTaskIn}})),
    setUpdateTask:(updatedTaskIn)=>set((state)=>{
        const taskArray=state.tasks.map((task)=>task.id===updatedTaskIn.id ? {...task,updatedTaskIn}:task);
        return {tasks:taskArray};
    }),
    setDeleteTask:(taskIdIn)=>set((state)=>{
        const taskArray = state.tasks.filter(task=>task.id!==taskIdIn);
        return{tasks:taskArray};
    })
}))