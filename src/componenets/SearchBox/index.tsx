import React, {useCallback, useContext, useEffect} from 'react';
import styles from './SearchBox.module.scss';
import classes from 'classnames';
import {GithubIcon} from "../../utils/icons";
import {debounce} from 'lodash';
import {searchUsers} from "../../actions/SearchActions";
import {useDispatch} from "react-redux";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {GIST_FETCHING} from "../../utils/actionTypes";
import {SearchContext} from "../../context/searchContext";

interface searchProps {
    history: any
}

const SearchBox: React.FC<searchProps & RouteComponentProps> = ({history}) => {
    const {searchTerm, setSearchTerm} = useContext(SearchContext);

    const dispatch = useDispatch();

    const getData = useCallback((
        searchText: React.SetStateAction<string>) => searchUsers(searchText, dispatch), [dispatch])

    const initLoading =
        useCallback(() => dispatch({type: GIST_FETCHING}), [dispatch])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearchText = useCallback(
        debounce((searchText: React.SetStateAction<string>) => getData(searchText), 1000)
        , []);

    const searchChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const searchText = e.currentTarget?.value;
        setSearchTerm(searchText)
        if (searchText?.length > 2) {
            debounceSearchText(searchText)
            history.push(`/users`)
        } else if (history.location.pathname !== '/') {
            history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (searchTerm?.length > 2) {
            initLoading()
        }
    }, [searchTerm, initLoading])

    return (
        <div className={classes(styles.wrapper, searchTerm.length > 2 ? styles.top : '')}>
            <div className={styles.headingWrapper}>
                <GithubIcon width='50px' height='50px' className={styles.logo}/>
                <div>
                    <p>
                        Gists Search
                    </p>
                    <p>Search users to get the gists</p>
                </div>
            </div>

            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={searchChangeHandler}
                    className={styles.input}
                />
            </div>
        </div>
    )
}

export default withRouter(SearchBox);