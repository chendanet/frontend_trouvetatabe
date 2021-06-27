import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function AlertDismissibleDanger() {
    const [show, setShow] = useState(true);
    const history = useHistory();

    if (show) {
        return (
            <div className="alert container">
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Change something, and try again.
                </p>
            </Alert>
            </div>
        );
    }
    history.push("/")
}

export {AlertDismissibleDanger};