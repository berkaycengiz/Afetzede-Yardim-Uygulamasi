import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
