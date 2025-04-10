import { Route, Routes } from "react-router-dom"
import { CursosScreen } from "../components/screens/CursosScreen"
import { EstudiantesScreen } from "../components/screens/EstudiantesScreen"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/*" element={<CursosScreen/>}/>
        <Route path="/courses" element={<CursosScreen/>}/>
        <Route path="/students" element={<EstudiantesScreen/>}/>
    </Routes>
  )
}
