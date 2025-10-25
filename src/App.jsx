import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import OpenStudyPlan from './pages/OpenStudyPlan.jsx'
import Profile from './pages/Profile.jsx'
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import "./App.css"
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
    return (
        <SkeletonTheme baseColor="#ebebeb" highlightColor="#ddddddff">
            <BrowserRouter>
                <Routes>
                    {/* Rotas sem header/footer */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Rotas com header/footer */}
                    <Route
                        path="*"
                        element={
                            <>
                                <Header />
                                <div className="container">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/planos/:id" element={<OpenStudyPlan />} />
                                    </Routes>
                                </div>
                                <Footer />
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </SkeletonTheme>
    );
}

export default App;
