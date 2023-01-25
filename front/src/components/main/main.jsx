import PizzaItem from "./pizza/pizzaItem";


const Main = ({data, isSuccess, isLoading}, updateCartHeader) => {


    return (
        <div className='content'>
            <div className='container'>
                <h2 className='content__title'>Все пиццы</h2>
                <div className='content__items'>
                    {isSuccess && isLoading === false ? (
                        data.map((pizza) => {
                            return (
                                <PizzaItem pizza={pizza} key={pizza._id} updateCartHeader={updateCartHeader}/>
                            )
                        })
                    ) : <p>Пицца не была найдена</p>}
                </div>
            </div>
        </div>
    );
};

export default Main;