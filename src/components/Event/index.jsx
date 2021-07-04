const Event = ({ event, DisplayDate }) => {

    return (
        <div className="card col-md-3 rounded-5 p-3 m-4" align="center">
            <div className="card_img-container mb-3">
                <img src={event.cover.url} alt="events paris" className="card_img rounded-2" />
            </div>
            <h5 className="card-title m-2" > {event.title.substring(0, 30) + "..."} </h5>
            <p className="m-2"> Event: {event.price_type}</p>
            <p className="m-2"> Date: {DisplayDate(event.date_start)}</p>
            <button className="btn-events">
                <a href={event.url}>Link Event</a>
            </button>
        </div>
    )
}



export default Event