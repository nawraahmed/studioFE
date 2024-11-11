import { Routes, Route } from 'react-router-dom'
import './App.css'
import Project from './components/Project'
import Service from './components/Service'
import Calendar from './components/Calendar'
import Package from './components/Package'
import Contact from './components/Contact'
import Policy from './components/Policy'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <header>
        {/* Add your header content here (e.g., navigation links) */}
        <Header />
      </header>
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/services" element={<Service />} />
          <Route path="/packages" element={<Package />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Calendar />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
