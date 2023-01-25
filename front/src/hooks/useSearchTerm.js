import {useContext} from 'react'
import {SearchContext} from "../contexts/SearchFieldContext";

export const useSearchTerm = () => {
    const {searchField, setSearchField} = useContext(SearchContext)

    return {
        searchField,
        setSearchField,
    }
}