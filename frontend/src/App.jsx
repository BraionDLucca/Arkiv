import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import "./App.css"
import { lazy, Suspense } from "react";

/* Importando com lazy para carregar páginas apenas quando necessário */
const Home = lazy(() => import('./pages/Home.jsx'))
const OpenStudyPlan = lazy(() => import('./pages/OpenStudyPlan.jsx'))
const Register = lazy(() => import("./pages/Register.jsx"))
const Login = lazy(() => import("./pages/Login.jsx"))
const Profile = lazy(() => import('./pages/Profile.jsx'))

function App() {
    return (
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

                                {/* Susupense faz com que estas rotas possam
                                ser carregadas com lazy */}
                                <Suspense>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        
                                        <Route path="/planos/:id" element={<OpenStudyPlan />} />

                                        <Route path="/profile" element={<Profile />} />

                                    </Routes>
                                </Suspense>
                            </div>

                            <Footer />
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
