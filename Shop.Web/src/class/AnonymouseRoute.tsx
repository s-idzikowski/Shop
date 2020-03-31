import * as React from 'react';
import { Route, Redirect } from "react-router-dom";
import Client from "./Client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnonymouseRoute = ({ component, ...rest }: any): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const routeComponent = (props: any): JSX.Element => (
        !Client.IsLogged()
            ? React.createElement(component, props)
            : <Redirect to={{ pathname: '/unathorized' }} />
    );
    return <Route {...rest} render={routeComponent} />;
};

export default AnonymouseRoute;