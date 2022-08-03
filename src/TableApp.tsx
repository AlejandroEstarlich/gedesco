import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"

export const TableApp = () => {
  return (
    <BrowserRouter>
        <AppRouter />  
    </BrowserRouter>
  )
}
