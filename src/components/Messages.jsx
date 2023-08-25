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

    //Usestate variable to store the array of array of messages
    const [messageArray, setMessageArray] = useState([])

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
    },[currentUser,displayName])

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

    //Collecting all of your following users messages to be displayed
    async function collectFollowingMessages(){
        //Finding your following collection record (to find which users you follow)
        const followersDoc = await getDoc(doc(db,"following",currentUser.uid))
        const followersArray = followersDoc.data().following
        findFollowerArrays(followersArray)
    }

    async function findFollowerArrays(followersArray){
        followersArray.forEach((doc) => {
            collectFollowerArrays(doc)
        })
    }

    async function collectMessages(user){
        const wantedDoc = await getDoc(doc(db,"userPosts",user.uid))
        setMessageInfo(wantedDoc.data().messages)
    }

    async function collectFollowerArrays(user){
        const wantedDoc = await getDoc(doc(db,"userPosts",user.uid))
        setMessageArray( (prev) => [...prev, wantedDoc.data().messages])
    }

    //Function to separate the messageArrays array into the same format as the MessageInfo array
    function separateArrays(){
        //Mapping through the arrays to get to individual messages
        messageArray.map((doc) => {
            doc.map((message) => {
                setMessageInfo( (prev) => [...prev,message])
            })
        })
        //Removing the messageArray, so this code isn't repeated
        setMessageArray([])
    }

    return(
        <div className="messages">
            {messageArray[0] && separateArrays()}
            {/* Code to display the personal users messages to the userProfile page */}
            {messageInfo.sort((a,b) => a.date<b.date? 1 : -1).map((doc) => {
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