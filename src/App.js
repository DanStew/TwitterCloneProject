import './style.scss'

//Importing the pages components into the page
import DirectMessage from './pages/DirectMessage.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import UserProfile from './pages/UserProfile'
import Search from './pages/Search.jsx'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'

//Importing the needed functions into the code
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {

  //Finding the current user of the website
  const {currentUser} = useContext(AuthContext)

  //Creating the protected route for the website
  const ProtectedRoute = ({children}) =>{
    if (!currentUser){
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          {/* Implementing the protected route onto the home page */}
          <Route index element={<ProtectedRoute ><Home /></ProtectedRoute>} />
          {/* Implementing the dynamic route path for each individual users profile */}
          <Route path="user/profile/:displayName" element={<ProtectedRoute ><UserProfile /></ProtectedRoute>} />
          <Route path="messages" element={<ProtectedRoute ><DirectMessage /></ProtectedRoute>} />
          <Route path="search" element={<ProtectedRoute ><Search /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute ><Settings /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
