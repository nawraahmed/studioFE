import { Routes, Route } from 'react-router-dom'
import './App.css'
import Project from './components/Project'
import Service from './components/Service'
import NewService from "./components/NewService"
import Calendar from './components/Calendar'
import Package from './components/Package'
import NewPackage from "./components/NewPackage"
import Contact from './components/Contact'
import Policy from './components/Policy'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/Register'
import SignIn from './components/SignIn'
import Protofolio from './components/Protofolio'
import PortfolioPage from './components/PortfolioPage'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'

function App() {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
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
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/protofolio" element={<Protofolio />} />
          <Route path="/portfolio-list" element={<PortfolioPage />} />{' '}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
