import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./views/Login/Login"
import DesignEditor from "./views/DesignEditor"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/editor" element={<DesignEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
