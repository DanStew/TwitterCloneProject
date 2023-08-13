import { useContext } from 'react'
import defaultProfile from '../Images/defaultProfile.jpg'
import { AuthContext } from '../context/AuthContext'
import imgIcon from '../Images/imgIcon.jpg'
import { useNavigate } from 'react-router-dom'

function Message(){

    const {currentUser} = useContext(AuthContext)
    const navigator = useNavigate()

    return(
        <div className='message'>
            <div onClick={() => navigator(`/user/profile/${currentUser.displayName}`)} className="userInfo">
                <img src={defaultProfile} />
            </div>
            <div className="mainMessage">
                <div className="messageUpper">
                    <p onClick={() => navigator(`/user/profile/${currentUser.displayName}`)}>User Name</p>
                </div>
                <div className="messageLower">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum perferendis id expedita in quos exercitationem possimus impedit sunt voluptas perspiciatis voluptatum eaque minima, molestiae molestias sed odit explicabo illum similique quo. Iste ipsa iusto sint obcaecati possimus voluptatum iure. Itaque saepe unde delectus iure. Placeat minima ab aspernatur tempore sed?</p>
                </div>
            </div>
        </div>
    )
}

export default Message