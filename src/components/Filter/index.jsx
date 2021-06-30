const Filter = ({ cuisines, prices, setCuisines, setPrices }) => {

    const CUISINES = [
        "American",
        "Asian",
        "Californian",
        "French",
        "Indian",
        "Italian",
        "Japanese",
        "Korean",
        "Mexican",
        "Seefood",
        "Steak",
    ]

    const PRICES = [
        "Under than 35",
        "35-50",
        "More than 50"
    ]

    const handleChangeCuisine = (e) => {
        let { name } = e.target
        if (cuisines.indexOf(name) === -1) {
            setCuisines([...cuisines, name])
        } else {
            setCuisines(cuisines.filter((p) => p !== name))
        }
    }

    const handleChangePrice = (e) => {
        let { name } = e.target
        if (prices.indexOf(name) === -1) {
            setPrices([...prices, name])
        } else {
            setPrices(prices.filter((p) => p !== name))
        }
    }


    return (
        <div className="col-md-2 col-sm-12 filter mt-1 me-4 filter-column">
            <div>
                <h5 className="text-center fw-bold mt-1 mb-4">Filter</h5>
                <div className="fs-6 mb-1 fw-bold">
                    Cuisine : 🍽️
                </div>
                {CUISINES.map((c, index) => (
                    <div key={index}>
                        <input type="checkbox"
                            name={c}
                            value={c}
                            onChange={handleChangeCuisine}
                            checked={cuisines.includes(c) ? "checked" : ""}
                        />
                        <label className="fw-bold">{c}</label>
                    </div>
                ))}
            </div>
            <br />
            <div className="fs-6 mb-1 fw-bold">Price :
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-currency-euro" viewBox="0 0 16 16">
                    <path d="M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z" />
                </svg>
            </div>
            <div>
                {PRICES.map((p, index) => (
                    <div key={index}>
                        <input type="checkbox"
                            name={p}
                            value={p}
                            onChange={handleChangePrice}
                            checked={prices.includes(p) ? "checked" : ""}
                        />
                        <label className="fw-bold">{p}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default Filter;