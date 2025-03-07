import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Users from './components/Users'
import Description from './components/Description'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/description/:id" element={<Description />} />
      </Routes>
    </Router>
  )
}

export default App
