import React from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Users from "../Users";


const Search: React.FC<any> = () => {
    const match = useRouteMatch();

    return (
        <>
            <h1>Search</h1>
            <Switch>
                <Route path={`${match.path}users`}>
                    <Users/>
                </Route>
            </Switch>
        </>
    )
}

export default Search;