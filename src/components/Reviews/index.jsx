import { useState, useEffect } from "react"
import ReviewForm from "components/ReviewForm"


const Reviews = ({ currentVenue, currentUser, idVenue }) => {

    const [ratings, setRatings] = useState([])
    const star = "⭐️"
    const [emptyRatings, setEmptyRatings] = useState()
    const [modalRating, setModalRating] = useState(false);


    const fetchAllRatings = async () => {
        const response = await fetch('https://trouvetatableapi.herokuapp.com/api/ratings')
        const data = await response.json()
        setRatings(data)
        setEmptyRatings(data)
    }

    const toggleModalRating = () => {
        setModalRating(!modalRating);
    };

    let emptyRate = emptyRatings && currentVenue && emptyRatings.filter(rating => rating.venue_id === currentVenue.id)

    useEffect(() => {
        fetchAllRatings();
    }, [])


    return (
        <div className="card w-75 px-3 pt-2">
            <h5> Reviews </h5>
            <div className="">
                {ratings &&
                    ratings.filter(rating => rating.venue_id === currentVenue.id)
                        .map((rating, index) => (
                            <div key={index} className="col-md-12 col-sm-12 col-xs-12 my-2">
                                <span>{`${star.repeat(Math.abs(rating.score)) + " - " + rating.review}`}</span>
                            </div>
                        )

                        )}

                {emptyRate && emptyRate.length === 0 &&
                    <p>This venue doesn't have any review yet</p>}

            </div>

            {currentUser.id && currentVenue.user_id !== parseInt(currentUser.id) && (
                <div className="mb-2">
                    <button type="button" onClick={toggleModalRating}>
                        {" "}
                Leave a Review
              </button>{" "}
                </div>
            )}

            {modalRating && (
                <>
                    <ReviewForm modal={toggleModalRating} idVenue={idVenue} />
                </>
            )}
        </div>
    )

}



export default Reviews