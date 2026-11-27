import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./App.css"
import { lazy, Suspense } from "react";
import ChaptersPage from "./pages/ChaptersPage.jsx";
import ModulesPage from "./pages/ModulesPage.jsx";


/* Importando com lazy para carregar páginas apenas quando necessário */
const Home = lazy(() => import('./pages/Home.jsx'))
const OpenStudyPlan = lazy(() => import('./pages/OpenStudyPlan.jsx'))
const Register = lazy(() => import("./pages/Register.jsx"))
const Login = lazy(() => import("./pages/Login.jsx"))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const CreateStudyPlan = lazy(() => import('./pages/CreateStudyPlan.jsx'))
const ChapterContent = lazy(() => import('./pages/ChapterContent.jsx'))

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<p>Carregando...</p>}>
                <Routes>
                    {/* Rotas públicas sem Header e Footer */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Layout principal */}
                    <Route
                        path="*"
                        element={
                            <>
                                <Header />

                                <div className="app-container">
                                    <Routes>
                                        {/* Rotas públicas */}
                                        <Route path="/" element={<Home />} />

                                        <Route
                                            path="/planos/:id"
                                            element={<OpenStudyPlan />}
                                        />

                                        <Route
                                            path="/planos/:studyPlanId/modulos/:moduleId/capitulos"
                                            element={<ChaptersPage />}
                                        />

                                        <Route path="/planos/:studyPlanId/modulos" element={<ModulesPage />} />

                                        <Route path="/criar-plano" element={<CreateStudyPlan />} />

                                        <Route
                                            path="/planos/:studyPlanId/modulos/:moduleId/capitulos/:chapterId/conteudo"
                                            element={<ChapterContent />}
                                        />

                                        {/* Rotas protegidas */}
                                        <Route element={<ProtectedRoute />}>
                                            <Route
                                                path="/profile"
                                                element={<Profile />}
                                            />

                                            <Route
                                                path="/criar-plano"
                                                element={<CreateStudyPlan />}
                                            />
                                        </Route>
                                    </Routes>
                                </div>

                                <Footer />
                            </>
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
