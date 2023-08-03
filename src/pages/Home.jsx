import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"

function Home(){
    return(
        <div className="Home">
            <button onClick={() => signOut(auth)}>Sign Out</button>
        </div>
    )
}

export default Home