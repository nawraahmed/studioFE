import { Routes, Route } from 'react-router-dom'
import './App.css'
import Project from './components/Project'
import Service from './components/Service'
import NewService from './components/NewService'
import Calendar from './components/Calendar'
import Package from './components/Package'
import NewPackage from './components/NewPackage'
import Contact from './components/Contact'
import Policy from './components/Policy'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/Register'
import SignIn from './components/SignIn'
import AdminDashboard from './components/AdminDashboard'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'

function App() {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    //If a token exists, sends token to localStorage to persist logged in user
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <header>
        {/* Add your header content here (e.g., navigation links) */}
        <Header user={user} handleLogOut={handleLogOut} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/services" element={<Service />} />
          <Route path="/new-service" element={<NewService />} />
          <Route path="/packages" element={<Package />} />
          <Route path="/new-package" element={<NewPackage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Calendar />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
