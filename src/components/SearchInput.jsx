import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";
import SearchResult from '../components/SearchResult.jsx'

function SearchInput() {
  //Creating the variable to store the input from the user
  const [userSearch, setUserSearch] = useState("");

  //Creating an array of search results from the users query
  const [searchResults, setSearchResults] = useState([]);

  //Defining the collection to be searched from
  const usersCollection = collection(db, "users");

  //Function to see if the user wants to search (pressed enter)
  function checkSearch(e) {
    if (e.code == "Enter") {
      searchDatabase();
    }
  }

  //Function to search the database for the users search
  async function searchDatabase() {
    //Performing the search query
    const q = query(usersCollection, where("displayName", "==", userSearch));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSearchResults((prev) => [...prev, doc.data()]);
      setUserSearch("")
    });
  }

  return (
    <div className="searchInput">
      <div className="searchUpper">
        <input
          type="text"
          placeholder="Enter your search..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          onKeyDown={(e) => checkSearch(e)}
        />
      </div>
      <div className="searchResults">
        {searchResults.map((doc) => (
          <div key={doc.uid}>
            <SearchResult user={doc} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchInput;
