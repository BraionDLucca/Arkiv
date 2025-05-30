import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import OpenStudyPlan from './pages/OpenStudyPlan.jsx'
import Footer from './components/Footer.jsx'
import Profile from './pages/Profile.jsx'

function App() {

    return <>

        <BrowserRouter>
            <Header />

            <div className='container'>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cursos/:id" element={<OpenStudyPlan />} />
                </Routes>

            </div>

            <Footer />
        </BrowserRouter>
        
        

    </>
}

export default App