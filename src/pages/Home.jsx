import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"

//Importing the components needed for this page
import Sidebar from "../components/Sidebar"
import Main from "../components/Main"

function Home(){
    return(
        <div className="home defaultPageLayout">
            <Sidebar />
            <Main />
        </div>
    )
}

export default Home