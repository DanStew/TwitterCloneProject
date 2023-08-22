import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//Importing the needed components into this component
import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";

function UserProfile() {
  //Collecting the dynamic id from the URL
  const { displayName } = useParams();

  //Making a variable for the user profile you're currently on
  const [user, setUser] = useState(null);

  //Defining the collection to be searched from
  const usersCollection = collection(db, "users");

  useEffect(() => {
    //Function to search the database for the users search
    async function searchDatabase() {
      //Performing the search query
      const q = query(usersCollection, where("displayName", "==", displayName));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }

    //Cleanup function
    return () => {
      searchDatabase();
    };
  }, [displayName]);

  return (
    <div className="UserProfile">
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
