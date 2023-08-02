//Importing the needed images into this file
import imgIcon from '../Images/imgIcon.jpg'

function Register(){
    return(
        <div className="Register">
            <div className="formContainer">
                <div className="formWrapper">
                    <p className="logo">Twitter Clone</p>
                    <p className="title">Register</p>
                    <form>
                        <input type="text" placeholder="Display Name..." />
                        <input type="email" placeholder="Email Address..." />
                        <input type="password" placeholder="Password..." />
                        <input type="file" style={{display:"none"}} id="file"/>
                        <label htmlFor="file">
                            <img src={imgIcon} alt="" />
                            <span>Add Profile Image</span>
                        </label>
                        <button>Sign Up</button>
                    </form>
                    <p>Already have an account? <a href="">Login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register