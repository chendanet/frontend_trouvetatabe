
import { logout } from "store/actions";
import { PROD_PROFILE } from 'api/apiHandler';
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";



const DeleteUserProfil = ({ currentUser, token }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const fetchDeleteUser = async (e) => {
        e.preventDefault()

        const response = await fetch(
            `${PROD_PROFILE}/${currentUser.id}`,
            {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (response) {
            dispatch(logout())
            history.push("/");
        }
    };



    return (
        <div className="form-delete mb-5">
            <h4>Delete my account</h4>
            <br />
            <div className="textDelete">
                <p>Warning: you are about to delete your account. </p>
            </div>
            <div>
                <button type="submit" onClick={fetchDeleteUser} className="btn-alert">
                    DELETE
                </button>
            </div>
            <br />
        </div>
    )
}



export default DeleteUserProfil