import { useNavigate } from 'react-router-dom'
import imgIcon from '../Images/imgIcon.jpg'

//Importing the needed functions into this component
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

function Post(){

    const {currentUser} = useContext(AuthContext)
    const navigator = useNavigate()

    return(
        <div className="post">
            <div onClick={() => navigator(`/user/profile/${currentUser.displayName}`)}className="userInfo">
                <img src={currentUser.photoURL} />
            </div>
            <div className="mainInput">
                <div className="inputUpper">
                    <textarea rows="4" placeholder="What do you want to say..." />
                </div>
                <div className="inputLower">
                    <img src={imgIcon} alt="" />
                    <button>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Post