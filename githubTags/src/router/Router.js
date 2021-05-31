import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'

const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = '/'>
                    <HomePage />
                </Route>

                <Route exact path = '/login'>
                    <LoginPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router