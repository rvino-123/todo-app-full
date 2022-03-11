const listReducer = (state, action) => {
    switch(action.type) {
        case 'GET_ITEMS':
            return {
                ...state,
                listItems: action.payload,
                loading:false,
            }
        case 'GET_ITEM':
            return {
                ...state,
                listItem: action.payload,
                loading:false
            }
        case 'SET_LOADING': 
            return {
                ...state,
                loading:false
            }
        default: 
            return state
    }
}

export default listReducer;