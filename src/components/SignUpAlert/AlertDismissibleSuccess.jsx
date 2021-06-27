import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function AlertDismissibleSuccess() {
    const [show, setShow] = useState(true);
    const history = useHistory();

    if (show) {
        return (
            <div className="alert container">
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Welcome to Trouve Ta Table!</Alert.Heading>
                <p>
                We are happy to welcome you on our website! 
                </p>
            </Alert>
            </div>
        );
    }
    history.push("/profile")
}

export {AlertDismissibleSuccess};