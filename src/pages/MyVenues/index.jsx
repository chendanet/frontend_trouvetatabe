import { useSelector } from "react-redux";
import { Link } from "react-router-dom";





const MyVenues = ({ venues }) => {

    const currentManager = useSelector((state) => state.authReducer)
    console.log(currentManager.id)

    return (
        <div>
            {venues
                .filter((value) => value.user_id == currentManager.id)
                .map((item, index) => (
                    <div className="image-item" key={index}>
                        <img src={`https://source.unsplash.com/600x600/?dish&sig=${index}}`} alt="" />
                        <Link to={"/venues/" + item.id}>
                            <div className="container-item">
                                <h5>{item.name}</h5>
                                <p>{item.city}</p>
                                <p>{item.cuisine}</p>
                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    )
}



export default MyVenues