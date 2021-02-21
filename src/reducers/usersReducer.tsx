import {GIST_FETCHING, GIST_FETCHED, MORE_GIST_FETCHED} from '../utils/actionTypes';

const initialState = {
    isLoading: false,
    searchTerm: '',
    nodes: [],
    pageInfo: {}
}

const userReducer = (state = initialState, action: { type: any; payload: any; }) => {
    const {type, payload} = action;
    switch (type) {
        case GIST_FETCHING:
            return {
                ...state,
                isLoading: true
            }
        case GIST_FETCHED:
            return {
                ...state,
                ...payload,
                isLoading: false
            }
        case MORE_GIST_FETCHED:
            return {
                ...state,
                ...payload,
                nodes: [...state.nodes, ...payload.nodes],
                pageInfo: {...state.pageInfo, ...payload.pageInfo}
            }
        default:
            return state
    }
};

export default userReducer;