import {Service} from "../Services";
import {searchUserQuery, loadMoreUserQuery} from "../Services/queries";
import {GIST_FETCHED, MORE_GIST_FETCHED} from "../utils/actionTypes";

export const searchUsers = async (searchTerm: any, dispatch: any) => {
    try {
        const response: any = await Service({
            searchString: searchTerm
        }, searchUserQuery, 'users')
        if (response.search) {
            dispatch({
                type: GIST_FETCHED,
                payload: {
                    searchTerm,
                    ...response.search
                }
            })
        }
    } catch (e) {
        console.log(e)
    }

}

export const loadMoreData = async (searchTerm: string, selectedValue: string, after: string, dispatch: any, setLoading: (arg0: boolean) => void) => {
    try {
        const response: any = await Service({
            searchString: searchTerm,
            after
        }, loadMoreUserQuery, selectedValue)
        if (response.search && response.search?.nodes?.length) {
            setLoading(false);
            dispatch({
                type: MORE_GIST_FETCHED,
                payload: {
                    searchTerm,
                    ...response.search
                }
            })
        }
    } catch (e) {
        console.log(e)
    }

}
