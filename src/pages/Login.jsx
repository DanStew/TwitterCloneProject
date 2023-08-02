function Login(){
    return(
        <div className="Login">
            <div className="formContainer">
                <div className="formWrapper">
                    <p className="logo">Twitter Clone</p>
                    <p className="title">Login</p>
                    <form>
                        <input type="email" placeholder="Email Address..." />
                        <input type="password" placeholder="Password..." />
                        <button>Sign In</button>
                    </form>
                    <p>Already have an account? <a href="">Register</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login