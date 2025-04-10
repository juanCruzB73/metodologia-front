import { useEffect, useState } from "react"
import { getCourses } from "../../http/api"
import { ICourses } from "../../types/courses"
import { useNavigate  } from "react-router-dom";

export const CursosScreen = () => {
  const [courses,setCourses]=useState<ICourses[]>([]);

  const navigate=useNavigate();
  
  useEffect(()=>{
    const startCourses=async()=>{
      const data = await getCourses();
      setCourses(data);
    }
    startCourses()
  },[])
  
  return (
    <div>
      <h1>Cursos</h1>
      {
        courses.map((course:ICourses)=>(
          <div key={course.id}>
          <h2>{course.nombre}</h2>
          <h3 onClick={()=>{navigate(`/students/${course.id}`)}}>Estudiantes</h3>
          </div>
        ))
      }
    </div>
  )
}
