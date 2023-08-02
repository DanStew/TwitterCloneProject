import './style.scss'

//Importing the pages components into the page
import DirectMessage from './pages/DirectMessage.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import UserProfile from './pages/UserProfile'

function App() {
  return (
    <div className="App">
      <Register />
    </div>
  );
}

export default App;
