import {createContext} from "react";


export const SearchContext = createContext({
    searchField: '',
    setSearchField: (searchTerm) => {
    },
})