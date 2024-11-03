import { Navigate, Routes, Route } from 'react-router-dom'

import SignUpPage from "../src/Pages/auth/signup/SignUpPage.jsx"
import HomePage from './Pages/home/HomePage.jsx';
import LoginPage from "./pages/auth/login/LoginPage";
import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";
import NotificationPage from "./pages/notification/NotificationPage";
import Sidebar from "./components/common/Sidebar";
import { useQuery } from "@tanstack/react-query";
import ProfilePage from './Pages/profile/ProfilePage.jsx';

import LoadingSpinner from './components/common/LoadingSpinner.jsx';


function App() {
  const { data: authUser, isLoading } = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error)
      }
    },
    retry: false
  });

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    )
  }

  return (
    <div className='flex max-w-6xl mx-auto'>
      {authUser && <Sidebar />}
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  )
}

export default App
