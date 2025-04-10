import { Navigate, Route, Routes } from "react-router-dom"
import { CursosScreen } from "../components/screens/CursosScreen"
import { EstudiantesScreen } from "../components/screens/EstudiantesScreen"

export const AppRouter = () => {
  return (
    <Routes>

        <Route path="/courses" element={<CursosScreen/>}/>
        <Route path="/students/:courseId" element={<EstudiantesScreen/>}/>
    </Routes>
  )
}
