import { ICourses } from "../types/courses";

const API_URL=import.meta.env.VITE_API_URL

export const getCourses=async()=>{
    const response=await fetch(API_URL);
    const data=await response.json();
    return data;
};

export const getCourseById=async(id:string|null)=>{
    const response=await fetch(API_URL);
    let data=await response.json();
    data=data.filter((course:ICourses)=>course.id===id);
    if(data){
        return data;
    }
    return [];
    
}