import Sidebar from '../components/Sidebar.jsx'
import SearchInput from '../components/SearchInput.jsx'

function Search(){
    return(
        <div className="search">
            <Sidebar />
            <div className='searchBody'>
                <SearchInput />
            </div>
        </div>
    )
}

export default Search