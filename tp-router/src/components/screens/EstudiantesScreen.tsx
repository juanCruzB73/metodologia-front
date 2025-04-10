import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getCourseById } from "../../http/api";
import { IStudent } from "../../types/student";

export const EstudiantesScreen = () => {
  
  const [students,setStudents]=useState<IStudent[]>([])

  const {courseId}=useParams();
  
  useEffect(()=>{
    const getCourse=async()=>{
      if (courseId){
        const data=await getCourseById(courseId);
        if (data.length > 0)setStudents(data[0].estudiantes);
      }
    }
    if(courseId)getCourse();
  },[])
  return (
    <div>
      {
        students.length>0?(
        <>
        <h1>Estudiantes</h1>
        {
          students.map((student:IStudent)=>(
            <div key={student.id}>
            <h2>{student.nombre}</h2>
            </div>
          ))
        }
      </>):
      (<>
        <h2>Error in course ID</h2>
      </>)
      }
    </div>
  )
}
