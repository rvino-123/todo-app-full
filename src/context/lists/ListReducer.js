const listReducer = (state, action) => {
    switch(action.type) {
        case 'GET_ITEMS':
            return {
                ...state,
                listItems: action.payload,
                loading:false,
            }
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        case 'GET_CATEGORY':
            return {
                ...state,
                category: action.payload,
                loading:false
            }
        case 'GET_NOTE':
            return {
                ...state,
                note: action.payload,
                loading:false
            }
        case 'CLEAR_NOTE':
            return {
                ...state,
                note: {}
            }
        case 'GET_ITEM':
            return {
                ...state,
                listItem: action.payload,
                loading:false
            }
        case 'FILTER_ITEMS':
            return {
                ...state,
                filteredItems: action.payload,
                isFiltered: true,
                loading:false
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                listItems: action.payload,
            }
        case 'SET_LOADING': 
            return {
                ...state,
                loading:true
            }
        case 'RESET_FILTER': 
        return {
            ...state,
            isFiltered: false,
            filteredItems: []
        }
        default: 
            return state
    }
}

export default listReducer;