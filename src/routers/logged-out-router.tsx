import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { NotFound } from '../pages/404';
import { Main } from '../pages/main';



const pageRoutes = [
    {
        path: "/" ,
        component: <Main />
    }
]

export const LoggedOutRouter = () => {
    return (
    <Router>
        <Switch>
            {pageRoutes.map((route) => (
                <Route exact key={route.path} path={route.path}>
                    {route.component}
                </Route>
            ))
            }
            <Route>
                <NotFound />
            </Route>
        </Switch>
        
    </Router>
    )
}