import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MyLayout from './layout/layout';

const DefaultRoute = ({ component: Component, ...rest }) => {
    //check auth
    const token = localStorage.getItem('token');
    if (token === null || token === "") {
        return <Redirect to="/login" />
    }
    return (
        <Route {...rest} render={props => (
            <MyLayout {...props}>
                <Component {...props} />
            </MyLayout>
        )} />
    );
}

export default DefaultRoute;