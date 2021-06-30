/* eslint-disable eqeqeq */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authenticate } from "store/actions";
import { PROD_SIGNUP } from 'api/apiHandler';


const SignUpForm = ({ setShow }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [is_manager, setIsManager] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleOnChange = () => {
        setIsManager(!is_manager);
    };

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const fieldsIsValid = (
        password.length > 5 && confirmPassword === password && emailRegex.test(email)
    );

    const fetchSignUp = async (e) => {
        if (fieldsIsValid) {
            const dataUser = {
                user: {
                    email: email,
                    password: password,
                    is_manager: is_manager,
                },
            };
            e.preventDefault();
            const response = await fetch(PROD_SIGNUP, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataUser),
            });
            if (response.status != 200) {
                setShow(true);
                return
            }

            const token = response.headers.get("Authorization").split("Bearer ")[1];
            const data = await response.json();
            const userId = data.data.id;
            const userEmail = data.data.attributes.email;
            const isManager = data.data.attributes.is_manager;
            const userFirstName = data.data.attributes.first_name;
            const userLastName = data.data.attributes.last_name;

            dispatch(
                authenticate(
                    {
                        id: userId,
                        email: userEmail,
                        is_manager: isManager,
                        first_name: userFirstName,
                        last_name: userLastName
                    },
                    token
                )
            );
            history.push("/");
        }
    };

    return (
        <div>
            <form onSubmit={fetchSignUp} keyboard={false} dblClick={false}>
                <div>
                    <label>
                        E-mail
                    </label>
                    <input
                        type="text"
                        name="email"
                        onChange={handleEmail}
                        required="required"
                        placeholder="Ex: ted@example.com"
                        className="form-control"
                    />
                    <br />
                    <label>
                        Password
                    </label>
                    <input
                        rows="4"
                        type="password"
                        name="password"
                        onChange={handlePassword}
                        placeholder="Enter Password"
                        required="required"
                        className="form-control"
                    />
                    <br />
                    <label>
                        Confirm your Password
                    </label>
                    <input
                        rows="4"
                        type="password"
                        name="password"
                        onChange={handleConfirmPassword}
                        placeholder="Confirm your Password"
                        required="required"
                        className="form-control"
                    />{" "}
                    <br />
                    <div className="check-manager">
                        <input
                            id="checkbox"
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={is_manager}
                            onChange={handleOnChange}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            id="flexCheckDefault"
                        />
                        <label className="form-check-label" for="flexCheckDefault">
                            Are you a manager ?
                        </label>
                    </div>{" "}
                    <br />
                    <input type="submit" value="Sign up" className="btn-signin" />
                    <br />
                    <Link to="/login" className="link">
                        <button className="btn-login">Go to my account</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}


export default SignUpForm