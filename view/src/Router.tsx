import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignEditor from "./views/DesignEditor"
import Login from "./views/Login/Login"
import Register from "./views/Login/Register"


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/editor/:id" element={<DesignEditor />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
