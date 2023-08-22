import { useNavigate } from 'react-router-dom'

function Message({messageInfo}){

    const navigator = useNavigate()

    return(
        <div className='message'>
            <div onClick={() => navigator(`/user/profile/${messageInfo.displayName}`)} className="userInfo">
                <img src={messageInfo.photoURL} alt=""/>
            </div>
            <div className="mainMessage">
                <div className="messageUpper">
                    <p onClick={() => navigator(`/user/profile/${messageInfo.displayName}`)}>{messageInfo.displayName}</p>
                </div>
                <div className="messageLower">
                    {messageInfo.message}
                </div>
            </div>
        </div>
    )
}

export default Message