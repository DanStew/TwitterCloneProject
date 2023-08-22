import { useNavigate } from 'react-router-dom'
import imgIcon from '../Images/imgIcon.jpg'

//Importing the needed functions into this component
import { AuthContext } from '../context/AuthContext'
import { useContext, useState } from 'react'
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { v4 as uuid } from "uuid"

function Post(){

    //Code to store what the user has typed
    const [message, setMessage] = useState("")

    const {currentUser} = useContext(AuthContext)
    const navigator = useNavigate()

    async function makePost(){
        //Updating the document to include the message posted
        await updateDoc(doc(db,"userPosts",currentUser.uid),{
            messages: arrayUnion({
                //Creating a unique id for each text sent
                id: uuid(),
                message,
                displayName : currentUser.displayName,
                photoURL : currentUser.photoURL,
                //You can't use serverTimestamp within the arrayUnion function
                date: Timestamp.now()
            })
        })
        setMessage("")
    }

    return(
        <div className="post">
            <div onClick={() => navigator(`/user/profile/${currentUser.displayName}`)}className="userInfo">
                <img src={currentUser.photoURL} />
            </div>
            <div className="mainInput">
                <div className="inputUpper">
                    <textarea rows="4" placeholder="What do you want to say..." value={message} onChange={(e) => setMessage(e.target.value)}/>
                </div>
                <div className="inputLower">
                    <img src={imgIcon} alt="" />
                    <button onClick={makePost}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Post