import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

//Importing the needed components into this component
import Sidebar from "../components/Sidebar"

function UserProfile(){

    //Finding the current user of the website
    const {currentUser} = useContext(AuthContext)
    return(
        <div className="UserProfile">
            <Sidebar />
            {currentUser.displayName}
        </div>
    )
}

export default UserProfile