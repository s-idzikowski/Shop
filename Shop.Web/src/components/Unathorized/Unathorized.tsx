import * as React from 'react';

const Unathorized = (): JSX.Element => {
    console.log("Unathorized");

    return (
        <div>
            <p>
                <h1>Brak dostępu.</h1>
            </p>

            <p>
                <h2>Dostęp tylko dla zalogowanego użytkownika!</h2>
            </p>
        </div>
    );
}

export default Unathorized;