import { useState } from "react"
import { auth, navigator } from "../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom";

function Login(){

    //Storing the inputs from the user
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Creating the navigator for the website 
    const navigator = useNavigate()

    async function handleSelect(e){
        //This prevents the page from refreshing when the button is pressed
        e.preventDefault()

        try{
            await signInWithEmailAndPassword(auth, email,password);
            //Transporting the user to the homepage
            navigator("/")
        } catch(err){
            console.log(err)
        }
    }

    return(
        <div className="Login">
            <div className="formContainer">
                <div className="formWrapper">
                    <p className="logo">Twitter Clone</p>
                    <p className="title">Login</p>
                    <form>
                        <input type="email" placeholder="Email Address..." onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={(e) => handleSelect(e)}>Sign In</button>
                    </form>
                    <p>Already have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login