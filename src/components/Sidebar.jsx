//Importing needed images into the component
import homeIcon from '../Images/homeIcon.jpg'
import messageIcon from '../Images/messagesIcon.jpg'
import searchIcon from '../Images/searchIcon.jpg'
import settingsIcon from '../Images/settingsIcon.jpg'

//Importing the needed function into the component
import { useContext } from "react"
import { AuthContext} from '../context/AuthContext.js'
import { useNavigate } from 'react-router-dom'

function Sidebar(){

    //Finding the current user of the website
    const {currentUser} = useContext(AuthContext)

    //Creating the navigator to go to other pages
    const navigator = useNavigate()
    
    return(
        <div className="sidebar">
            <div onClick={() => navigator("/")} className="sidebarTab">
                <img src={homeIcon} alt="Home" />
                <span>Home</span>
            </div>
            <div onClick={() => navigator("/search")} className="sidebarTab">
                <img src={searchIcon} alt="Search" />
                <span>Search</span>
            </div>
            <div onClick={() => navigator("/messages")} className="sidebarTab">
                <img src={messageIcon} alt="Messages" />
                <span>Messages</span>
            </div>
            <div onClick={() => navigator(`/user/profile/${currentUser.displayName}`)} className="sidebarTab">
                <img src={currentUser.photoURL} alt="Profile" />
                <span>Profile</span>
            </div>
            <div onClick={() => navigator("/settings")} className="sidebarTab">
                <img src={settingsIcon} alt="Settings" />
                <span>Settings</span>
            </div>
        </div>
    )
}

export default Sidebar