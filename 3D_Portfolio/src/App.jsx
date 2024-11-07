// until 1 hr 13 min 
// link: https://www.youtube.com/watch?v=FkowOdMjvYo 

import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Home, Contact, About, Projects } from "./pages"

function App() {

  return (
    <main className="bg-violet-100/50">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

        </Router>
    </main>
  )
}

export default App
