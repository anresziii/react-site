import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../context';
import { publicRouters, privateRouters } from '../router';
import Loader from './ui/loader/Loader';

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    return (
        isAuth
            ?
            <Switch>
                {privateRouters.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to="/posts" />
            </Switch>
            :
            <Switch>
                {publicRouters.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to="/login" />
            </Switch>
    )
}

export default AppRouter
