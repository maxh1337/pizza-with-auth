import React, {useState} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import App from '../App'
import {SearchContext} from "../contexts/SearchFieldContext";

const AppProvider = () => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))
    const [searchField, setSearchField] = useState('')

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            <SearchContext.Provider value={{searchField, setSearchField}}>
                <App/>
            </SearchContext.Provider>
        </AuthContext.Provider>
    )
}

export default AppProvider
