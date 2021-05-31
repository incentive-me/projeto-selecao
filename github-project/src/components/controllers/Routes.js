import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'



const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={routeProps => (
        false ? (
            <Component {...routeProps}></Component>
        ) :
            <Redirect to={{ pathname: "/login", state: { from: routeProps.location } }}></Redirect>
    )
    }>
    </Route>
)


const Routes = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/auth/callback" component={()=> <h1>teste</h1>}></Route>
            <PrivateRoute exact path='/' component={Home}></PrivateRoute>            
        </Switch>
    </BrowserRouter>


export default Routes
