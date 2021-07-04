import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import config from 'config'
import "pages/Profile/Profile.css";
import EditProfilForm from 'components/EditProfilForm'
import DeleteUserProfil from 'components/DeleteUserProfil'
import MyBookings from 'components/MyBookings'

const Profile = () => {
    const currentUser = useSelector(state => state.authReducer)
    const token = Cookies.get(config.COOKIE_STORAGE_KEY)



    return (
        <div className="container-profil">
            <div className="row justify-content-md-center justify-content-sm-center justify-content-xs-center">
                <div className=" col-md-6 col-sm-6 mt-4 text-center ">
                    {currentUser.last_name ? <p className="text-center"> Hello <span className="fs-6 fw-bold lastName-profile">{currentUser.last_name}</span></p> : <p> Hello, you are connected with: <span className="fs-6 fw-bold email-profile">{currentUser.email}</span></p>}
                </div>
            </div>
            <div className="container d-flex align-items-center justify-content-center">
                <EditProfilForm currentUser={currentUser} token={token} />
            </div>
            <div className="container d-flex align-items-center justify-content-center">
                <DeleteUserProfil currentUser={currentUser} token={token} />
            </div>
            <div className="container ">
                <MyBookings currentUser={currentUser} token={token} />
            </div>
        </div>


    )
}


export default Profile;