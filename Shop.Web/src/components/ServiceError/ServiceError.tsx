import * as React from 'react';

import './ServiceError.css';

interface Props {
    message?: string;
}

const ServiceError = (props: Props): JSX.Element => {

    return (
        <div className="alert alert-danger m-2 p-2">
            <p>
                Błąd serwisu. Spróbuj ponownie za chwilę!
            </p>
            {
                props.message ? (
                    <p>
                        {props.message}
                    </p>
                ) : ""
            }
        </div>
    );
}

export default ServiceError;