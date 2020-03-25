import * as React from 'react';

interface IProps {
    title: string
}

const PageTitle = (props: IProps) => {
    return (
        <div className="shadow p-2 ml-2 mr-2 mt-3 mb-5">
            <h1>{props.title}</h1>
        </div>
    );
}

export default PageTitle;