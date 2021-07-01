import { Link, useHistory } from "react-router-dom"
import Cookies from "js-cookie";
import config from "config";
import { PROD_EDIT_VENUE } from "api/apiHandler";
import { useState } from "react";
import EditVenueForm from "components/EditVenueForm";
import BookingForm from "components/BookingForm";


const VenueCard = ({ currentVenue, currentUser, idVenue }) => {

    const token = Cookies.get(config.COOKIE_STORAGE_KEY);
    const history = useHistory();
    const [modalBooking, setModalBooking] = useState(false);
    const [modalEditVenue, setModalEditVenue] = useState(false);

    const fetchDeleteVenue = async () => {
        const response = await fetch(`${PROD_EDIT_VENUE}/${idVenue}`, {
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (response) {
            history.push("/myVenues");
        }
    };


    const toggleModalBooking = () => {
        setModalBooking(!modalBooking);
    };

    const toggleModalEditVenue = () => {
        setModalEditVenue(!modalEditVenue);
    };



    return (
        <>
            <div className="col-md-5">
                <div className="card">
                    {!currentVenue.images[0] ?
                        <img
                            src={`https://source.unsplash.com/600x600/?dish`}
                            alt={`${currentVenue.name}_image`}
                            className="card_img"
                        />
                        : <img
                            src={currentVenue.images[0]}
                            alt={`${currentVenue.name}_image`}
                            className="card_img"
                        />}
                    <div className="px-3 pt-2">
                        <h2 className="title-venue">{currentVenue.name}</h2>
                        <h6>{currentVenue.cuisine}</h6>
                        <p className="text-justify">{currentVenue.description}</p>

                        <div className="">
                            <div className="row mb-3">
                                <div className="col-md-6 col-sm-12">
                                    <h6>Adresse: </h6>
                                    <span>{currentVenue.address}</span>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <h6>Phone number</h6>
                                    <span>{currentVenue.phone_number}</span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <h6>Price</h6>
                                <span className="text-dark h6 fw-normal">{Math.floor(currentVenue.price * 0.90)} € instead of {currentVenue.price} €</span>

                            </div>

                            <div className="col-md-12 col-sm-12 my-2">
                                {currentUser.id && currentVenue.user_id !== parseInt(currentUser.id) && (
                                    <div>
                                        <button type="button" onClick={toggleModalBooking}>
                                            Find a Table
                                        </button>{" "}
                                    </div>
                                )}

                                {!currentUser.id && (
                                    <div>
                                        <Link to="/register">
                                            <button>Sign or Login to Find a Table</button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        {currentVenue.user_id === parseInt(currentUser.id) && (
                            <div>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={toggleModalEditVenue}
                                        idVenue={idVenue}
                                        className="m-2">
                                        Edit
                                    </button>
                                    <button onClick={fetchDeleteVenue} className="m-2">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {modalBooking && (
                <BookingForm modal={toggleModalBooking} idVenue={idVenue} />
            )}

            {modalEditVenue && (
                <EditVenueForm modal={toggleModalEditVenue} idVenue={idVenue} />

            )}
        </>
    )
}



export default VenueCard