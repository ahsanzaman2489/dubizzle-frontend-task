import React, {useContext} from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import SearchBox from '../../componenets/SearchBox'
import Users from "../Users";
import {useSelector} from "react-redux";
import {SearchContext} from "../../context/searchContext";
import Loading from "../../componenets/Loading";

const Search: React.FC<any> = () => {
    const match = useRouteMatch();
    const {searchTerm} = useContext(SearchContext);

    const {users} = useSelector((state: any) => ({
        users: state.users
    }));

    return (
        <>
            <SearchBox/>
            <Switch>
                <Route path={`${match.path}users`}>
                    {users.isLoading ? <Loading/> : (searchTerm?.length > 2) &&
                        <Users usersList={users}/>}
                </Route>
            </Switch>
        </>
    )
}

export default Search;