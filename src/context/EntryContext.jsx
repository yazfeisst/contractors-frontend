//react imports
import { createContext, useReducer } from "react";

export const EntryContext = createContext();

export const entriesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ENTRIES': 
            return {
                entries: action.payload
            }
        case 'CREATE_ENTRY':
            return {
                entries: [action.payload, ...state.entries]
            } 
        case 'DELETE_ENTRY':
            return {
                entries: state.entries.filter((entry) => entry._id !== action.payload)
            }
        case 'UPDATE_ENTRY': {
            const updatedEntry = action.payload;
            const updatedEntries = state.entries.map(entry => {
                if (entry._id === updatedEntry._id) {
                    return updatedEntry
                }
                return entry
            });

            return {
                entries: updatedEntries
            }
        } 
        default:
            return state  
    }
}

export const EntriesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(entriesReducer, {
        entries: []
    });

    return (
        <EntryContext.Provider value={{...state, dispatch}}>
            {children}
        </EntryContext.Provider>
    )
}