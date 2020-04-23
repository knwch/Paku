import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptype from 'prop-types';

const AdminRoute = ({component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render = {props =>
            auth.user.status === 1 ? (
                <Component {...props} />
            ) : (
                <Redirect to="/"/>
            )
        }
    />
)

AdminRoute.prototype = {
    auth: Proptype.object.isRequired
}

const mapStateToProp = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProp)(AdminRoute);
