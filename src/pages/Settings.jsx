import { signOut } from "firebase/auth"
import Sidebar from "../components/Sidebar"
import { auth } from "../config/firebase"

function Settings(){
    return(
        <div className="Settings">
            <div className="sideBody">
                <Sidebar />
            </div>
            <div className="mainBody">
                <button onClick={() => signOut(auth)}>Log Out</button>
            </div>
        </div>
    )
}

export default Settings