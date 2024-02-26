import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//Importing the needed components into this component
import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";

function UserProfile() {
  //Collecting the dynamic id from the URL
  const { displayName } = useParams();
  
  //Finding the current user of the website
  const { currentUser } = useContext(AuthContext)

  //Making a variable for the user profile you're currently on
  const [user, setUser] = useState(null);

  //Defining the collection to be searched from
  const usersCollection = collection(db, "users");

  useEffect(() => {
    searchDatabase()
  }, [displayName]);

  //Function to search the database for the user's profile that you are currently on
  async function searchDatabase(){
      //Performing the search query
      const q = query(usersCollection, where("displayName", "==", displayName));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
  }

  //Function to add the user to their following database
  async function addFollow() {
    //Updating the document to include the new followed user
    await updateDoc(doc(db, "following", currentUser.uid), {
      following: arrayUnion({
        //Storing the followed user id into the collection
        uid: user.uid
      })
    })
  }

  return (
    <div id="UserProfile" className="defaultPageLayout">
      <div className="sideBody">
        <Sidebar />
      </div>
      {/* This is where the users information will be displayed */}
      <div className="mainBody">
        <div className="pageHeader">
          <div className="photoDiv">
            {user && <img src={user.photoURL} alt="" />}
          </div>
          <div className="userInfoDiv">
            {user && <span>{user.displayName}</span>}
            {displayName != currentUser.displayName && <button onClick={addFollow}>Follow</button>}
          </div>
        </div>
        {/* This is where the messages from the user will be displayed to the screen */}
        <div className="pageBody">
          <Messages type="userProfile" />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
