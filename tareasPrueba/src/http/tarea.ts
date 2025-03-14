import axios from "axios"
import { ITask } from "../types/ITask";

const API_URL = "http://localhost:3000/tareas"

export const getAllTasks = async()=>{
    try{
        const response=await axios.get<ITask[]>(API_URL);
        return response.data;
    }catch(error){
        console.error(error);
    }
};
export const newTask = async(newTask:ITask)=>{
    try{
        const response=await axios.post<ITask>(API_URL,{...newTask});
        return response.data;
    }catch(error){
        console.error(error);
    }
};
export const updateTask = async(newTask:ITask)=>{
    try{
        const response=await axios.put<ITask>(`${API_URL}/${newTask.id}`,{...newTask});
        return response.data;
    }catch(error){
        console.error(error);
    }
};
export const deleteTask = async(taskIdToDelete:string)=>{
    try{
        const response=await axios.delete<ITask>(`${API_URL}/${taskIdToDelete}`);
        return response.data;
    }catch(error){
        console.error(error);
    }
};