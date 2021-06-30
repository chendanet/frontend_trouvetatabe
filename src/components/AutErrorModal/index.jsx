import { Modal, Alert, Button } from 'react-bootstrap';


const AuthErrorModal = ({ show, setShow }) => {

    return (
        <Modal show={show} variant="success" align="center">
            <div className="card rounded-5 p-3 m-4" align="center">
                <Alert.Heading> Ops, sorry </Alert.Heading>
                <hr />
                <p> Could not register your account. Please try again   </p>
                <Button onClick={() => setShow(false)} variant="outline-danger">
                    Close
                </Button>
            </div>
        </Modal>
    )
}



export default AuthErrorModal