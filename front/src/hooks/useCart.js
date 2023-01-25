export const useCart = (pizza) => {
    let count = {count: 0}
    const newCartPizza = {...pizza, ...count}

    return {newCartPizza}
}