const ModalReducer = (state, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return action.payload
        case 'CLOSE_MODAL':
            return action.payload
        default:
            return state
    }
}


export default ModalReducer;