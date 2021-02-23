import React, {useEffect, useRef, useContext, useCallback, useState} from 'react';
import styles from './List.module.scss';
import {SearchContext} from "../../context/searchContext";
import {debounce} from "lodash";
import {loadMoreData} from "../../actions/SearchActions";
import {useDispatch} from "react-redux";
import Loading from "../Loading";

interface listProps {
    data: {
        nodes: any,
        pageInfo: any
    },
    Component: any
}

const List: React.FC<listProps> = ({data, Component}) => {
    const listRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const {searchTerm} = useContext(SearchContext);
    const {pageInfo} = data;

    const [loading, setLoading] = useState(false) as any;

    const {endCursor, hasNextPage} = pageInfo;
    const dispatch = useDispatch();

    const loadMore = () => {
        setLoading(true)
        loadMoreData(searchTerm, endCursor, dispatch, setLoading)
    }
    const debounceLoadMoreData = useCallback(
        debounce(() => loadMore(), 1000)
        , [endCursor]);

    const renderList = (data: any) => {
        if (!data.nodes?.length) return (<div className={styles.noData}>No data available</div>)
        const rows: any = data.nodes.map((item: any, index: number) => {
            return <Component item={item} key={index}/>
        });

        return rows;
    }

    return (
        <>
            <div ref={listRef} className={styles.wrapper}>
                {renderList(data)}
            </div>
            {hasNextPage && <div className={styles.loadMore}>
                {loading && <Loading/>}
                <button onClick={debounceLoadMoreData}>load more</button>
            </div>}
        </>
    )
}

export default List;