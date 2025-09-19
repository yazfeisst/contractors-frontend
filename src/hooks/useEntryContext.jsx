import { useContext } from "react";

import { EntryContext } from "../context/EntryContext";

export const useEntryContext = () => {
    const context = useContext (EntryContext) 

    if (!context) {
        throw Error('useEntryContext hook must be used inside EntryContextProvider'); 
    }

    return context
}