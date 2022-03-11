import { createContext, useReducer } from "react";
import listReducer from "./ListReducer";

const ListContext = createContext()

export const ListProvider = ({ children }) => {
    const initialState = {
        listItems: [],
        listItem: {},
        loading: false
    }

    const [state, dispatch] = useReducer(listReducer, initialState)

    return (
        <ListContext.Provider
            value={{...state,
            dispatch}} >
                {children}
        </ListContext.Provider>
    )
}

export default ListContext;