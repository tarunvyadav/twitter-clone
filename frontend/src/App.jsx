import { Routes, Route } from 'react-router-dom'
import './App.css';
import SignUpPage from "../src/Pages/auth/signup/SignUpPage.jsx"
import HomePage from './Pages/home/HomePage.jsx';
import LogingPage from './Pages/auth/login/LogingPage.jsx';
import notificationPage from './Pages/notification/notificationPage.jsx';
import ProfilePage from './Pages/profile/ProfilePage.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <><div className='flex max-w-6xl mx-auto'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LogingPage />} />
        <Route path='/notifications' element={<notificationPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Routes>
    </div>
    </>
  )
}

export default App
