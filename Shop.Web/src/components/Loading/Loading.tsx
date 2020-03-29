import * as React from 'react';

const Loading = (): JSX.Element => {

    return (
        <div className="d-flex justify-content-center m-4">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;