import {Service} from "../Services";
import {searchUserQuery, loadMoreUserQuery} from "../Services/queries";
import {GIST_FETCHED, MORE_GIST_FETCHED, GIST_ERROR} from "../utils/actionTypes";

export const searchUsers = async (searchTerm: any, dispatch: any) => {
    try {
        const response: any = await Service({
            searchString: searchTerm
        }, searchUserQuery, 'users')

        if (response.user) {
            dispatch({
                type: GIST_FETCHED,
                payload: {
                    searchTerm,
                    ...response.user.gists
                }
            })
        }
    } catch (e) {
        dispatch({
            type: GIST_ERROR
        })
        console.log(e)
    }

}

export const loadMoreData = async (searchTerm: string, after: string, dispatch: any, setLoading: (arg0: boolean) => void) => {
    try {
        const response: any = await Service({
            searchString: searchTerm,
            after
        }, loadMoreUserQuery, 'users')
        if (response.user) {
            setLoading(false);
            dispatch({
                type: MORE_GIST_FETCHED,
                payload: {
                    searchTerm,
                    ...response.user.gists
                }
            })
        }
    } catch (e) {
        setLoading(false);
        console.log(e)
    }

}
