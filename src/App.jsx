import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import OpenStudyPlan from './pages/OpenStudyPlan.jsx'
import Footer from './components/Footer.jsx'
import Profile from './pages/Profile.jsx'

function App() {

    return <>

        <Header />

        <div className='container'>
        <Profile />
        </div>
        
        <Footer />

    </>
}

export default App