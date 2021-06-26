import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

function AlertDismissibleSuccess() {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Welcome to Trouve Ta Table!</Alert.Heading>
                <p>
                We are happy to welcome you on our website! 
                </p>
            </Alert>
        );
    }
}

export {AlertDismissibleSuccess};