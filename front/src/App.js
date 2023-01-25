import {Route, Routes} from "react-router-dom";
import Header from "./components/header/header";
import './scss/app.scss'
import Cart from "./components/cart/cart";
import Main from "./components/main/main";
import FullPizza from "./components/main/pizza/fullPizza";
import {useQuery} from "react-query";
import {$api} from "./api/api";
import {useSearchTerm} from "./hooks/useSearchTerm";
import {useAuth} from "./hooks/useAuth";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

const App = () => {
    const {searchField, setSearchField} = useSearchTerm()
    const {isAuth, setIsAuth} = useAuth()


    const {isSuccess, isLoading, data, refetch, error} = useQuery(
        [`get all pizzas`],
        () =>
            $api({
                url: `/pizzas?searchTerm=${searchField}`,
            }),
        {
            refetchOnWindowFocus: false,

        },
    )


    return (
        <div className='wrapper'>
            <Header refetch={refetch}/>
            <Routes>
                <Route path='/' element={<Main isSuccess={isSuccess} isLoading={isLoading} data={data}/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/pizza/:id' element={<FullPizza/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </div>
    );
};

export default App;