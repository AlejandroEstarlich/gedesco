import { Navigate, Route, Routes } from "react-router-dom"
import { TablePage } from "../table"

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={ <TablePage /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
