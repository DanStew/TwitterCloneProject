import Sidebar from '../components/Sidebar.jsx'
import SearchInput from '../components/SearchInput.jsx'

function Search(){
    return(
        <div id="search" className="defaultPageLayout">
            <Sidebar />
            <div className='searchBody'>
                <SearchInput />
            </div>
        </div>
    )
}

export default Search