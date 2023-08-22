import { useContext, useEffect, useState } from 'react'
import Message from './Message.jsx'
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { AuthContext } from '../context/AuthContext.js';

function Messages({type}){

    //Collecting the dynamic id from the URL
    const { displayName } = useParams();

    //Defining the user to be stored
    const [user, setUser] = useState(null)

    //Defining the collection to be searched from
    const usersCollection = collection(db, "users");

    //Finding the current user of the website
    const {currentUser} = useContext(AuthContext)

    //Usestate variable to store all of the messages
    const [messageInfo, setMessageInfo] = useState([])

    //Defining the collection to be searched from
    const userPosts = collection(db, "userPosts");

    //Use effect function to call the correct function needed for the page that the user is on
    useEffect(() => {
        const returnFunction = () => {
            type=="userProfile" ? collectUserProfileMessages() : collectFollowingMessages()
        }

        if (currentUser.displayName != null){
            returnFunction()
        }
    },[currentUser])

    //Collecting all of the users messages
    async function collectUserProfileMessages(){
        if (currentUser.displayName != null){
            if (currentUser == displayName){
                collectMessages(currentUser)
            }
            else{
                //Performing the search query
                const q = query(usersCollection, where("displayName", "==", displayName));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    collectMessages(doc.data())
                });
            }
        }
    }

    function collectFollowingMessages(){

    }

    async function collectMessages(user){
        const wantedDoc = await getDoc(doc(db,"userPosts",user.uid))
        setMessageInfo(wantedDoc.data().messages)
    }

    return(
        <div className="messages">
            {messageInfo.map((doc) => {
                return(
                    <div key={doc.id}>
                        <Message messageInfo={doc}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Messages