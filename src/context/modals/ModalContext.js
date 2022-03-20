import { createContext, useReducer } from "react";
import ModalReducer from "./ModalReducer";

const ModalContext = createContext();
export const ModalProvider = ({children}) => {
    const initialState = {
        modalIsOpen: false
    }

    const [state, dispatch] = useReducer(ModalReducer, initialState)
    

    const openModal = () => {
        dispatch({
            type: 'OPEN_MODAL',
            payload: {modalIsOpen: true}
        })
    }

    const closeModal = () => {
        dispatch({
            type: 'CLOSE_MODAL',
            payload: {modalIsOpen: false}
        })
    }
    
    return <ModalContext.ModalProvider value={{ modalIsOpen: state, openModal, closeModal}}>
        {children}
    </ModalContext.ModalProvider>
}

export default ModalContext;