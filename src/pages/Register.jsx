//Importing the needed images into this file
import imgIcon from '../Images/imgIcon.jpg'
import defaultProfile from '../Images/defaultProfile.jpg'

//Importing needed functions into the file
import { useState } from 'react'
import { auth, db, storage } from '../config/firebase.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'

function Register(){

    //Creating useState variables for each of the inputs
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [file, setFile] = useState(null)

    //Creating the navigator to go to other pages
    const navigator = useNavigate()

    async function handleSelect(e){
        //Preventing the page from automatically refreshing
        e.preventDefault()

        //Implementing a default profile image
        !(file) ? setFile(defaultProfile) : setFile(file)

        try{
            const res = await createUserWithEmailAndPassword(auth,email,password)
            
            //Code to store and set the users profile img
            //The second parameter here is the name of the file that you are going to store
            const storageRef = ref(storage, displayName)
            const uploadTask = uploadBytesResumable(storageRef,file)

            uploadTask.on(
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        console.log("This code is running")
                        await updateProfile(res.user,{
                            displayName,
                            photoURL : downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid),{
                            uid : res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        })

                        //Database that stores information on all of the people that the user follows
                        await setDoc(doc(db, "following", res.user.uid), {following:[]})
                        //Database that stores information on all of the people that the user is in private chats with
                        await setDoc(doc(db, "userContacts", res.user.uid), {contacts:[]})
                        //Database that stores information on all of the users posts
                        await setDoc(doc(db, "userPosts", res.user.uid), {
                            messages:[]
                        })
                    })
                }
            )

            //Transporting the user to the homepage
            navigator("/")
        }
        catch (error){
            console.log(error)
        }
    }

    return(
        <div className="Register">
            <div className="formContainer">
                <div className="formWrapper">
                    <p className="logo">Twitter Clone</p>
                    <p className="title">Register</p>
                    <form>
                        <input type="text" placeholder="Display Name..." onChange={(e) => setDisplayName(e.target.value)}/>
                        <input type="email" placeholder="Email Address..." onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
                        <input type="file" style={{display:"none"}} id="file" onChange={(e) => setFile(e.target.files[0])}/>
                        <label htmlFor="file">
                            <img src={imgIcon} alt="" />
                            <span>Add Profile Image</span>
                        </label>
                        <button onClick={(e) => handleSelect(e)}>Sign Up</button>
                    </form>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register