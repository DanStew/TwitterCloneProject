import { useNavigate } from "react-router-dom"

function SearchResult({user}){

    //Making the navigator to travel page
    const navigator = useNavigate()

    return(
        <div className="searchResult" onClick={() => navigator(`/user/profile/${user.displayName}`)}>
            <div className="userPhoto">

                <img src={user.photoURL} alt="" />
            </div>
            <div className="userInfo">
                <div>{user.displayName}</div>
            </div>
        </div>
    )
}

export default SearchResult