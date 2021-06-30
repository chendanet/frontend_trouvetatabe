import Venue from 'components/Venue';
import { v4 as uuidv4 } from 'uuid'


const ListVenue = ({ venues, cuisines, prices, searchTerm }) => {

    return (

        <div className="col-md-9 col-sm-12 ms-1 ">
            <div className="row">
                {venues === undefined ? (
                    <div className="spinner spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : venues
                    .filter(value => cuisines.length === 0 || cuisines.indexOf(value.cuisine) > -1)
                    .filter(value => {
                        if (prices.length === 0) {
                            return true;
                        }
                        if (prices.indexOf("Under than 35") >= 0 && value.price < 35) {
                            return true
                        }
                        if (prices.indexOf("35-50") >= 0 && value.price >= 35 && value.price <= 50) {
                            return true
                        }
                        if (prices.indexOf("More than 50") >= 0 && value.price > 50) {
                            return true
                        }
                        return value
                    })
                    .filter(value => value.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((venue) => (
                        <Venue venue={venue} key={uuidv4()} />
                    ))
                }
            </div>
        </div>
    )
}


export default ListVenue