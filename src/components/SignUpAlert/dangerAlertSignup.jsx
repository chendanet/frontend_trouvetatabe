import { render } from '@testing-library/react';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

function AlertDismissibleDanger() {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Change something, and try again.
                </p>
            </Alert>
        );
    }
}
render(<AlertDismissibleDanger />);

export default AlertDismissibleDanger;