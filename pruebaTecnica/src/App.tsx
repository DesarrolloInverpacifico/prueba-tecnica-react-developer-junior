import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Employees from './components/Employees'
import Description from './components/Description'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/description/:id" element={<Description />} />
      </Routes>
    </Router>
  )
}

export default App
