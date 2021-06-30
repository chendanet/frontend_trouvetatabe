





const SearchBar = ({ setSearchTerm }) => {


    return (
        <div>
            <center><div className="detailsSearchbar input-group w-50">
                <span className="input-group-text" id="basic-addon1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel btn-outline-danger" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"></path>
                    </svg>
                </span>
                <input type="text" name="search" className="form-control" placeholder="Search your venue   Ex: Chez Dupont" aria-label="SearchBarFilter" aria-describedby="basic-addon1" onChange={(e) => setSearchTerm(e.target.value)} />
            </div></center>
            <center><div className="advantageText">Registered clients get an exclusive 10% discount for every booking 😋 </div></center>
        </div>
    )
}



export default SearchBar