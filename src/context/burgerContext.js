import axios from '../axios'
import React, { useState } from 'react';

const INGREDIENT_PRICES = { salad: 150, cheese: 250, bacon: 800, meat: 1500 };
const intialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 0,
    purchasing: false,
    ingredients_name: {
        salad: 'Салад',
        bacon: 'Гахайн мах',
        cheese: 'Бяслаг',
        meat: 'Үхрийн мах'
    },
    saving: false,
    finished: false,
    error: null
};
const BurgerContext = React.createContext();
export const BurgerStore = (props) => {
    const [burger, setBurger] = useState(intialState);

    const dataToFirebase = (newOrder, token) => {
        setBurger({ ...burger, saving: true });
        axios.post(`/orders.json?auth=${token}`, newOrder)
            .then(response => {
                setBurger({
                    ...burger, saving: false, finished: true, error: null
                });
            })
            .catch(er => setBurger({ ...burger, saving: false, finished: true, error: er }));
    };
    const clearBurger = () => {
        setBurger(intialState);
    };
    const addIngredients = orts => {
        setBurger({
            ...burger,
            ingredients: {
                ...burger.ingredients,
                [orts]: burger.ingredients[orts] + 1
            },
            totalPrice: burger.totalPrice + INGREDIENT_PRICES[orts],
            purchasing: true
        });
    };
    const removeIngredients = orts => {
        const newPrice = burger.totalPrice - INGREDIENT_PRICES[orts];
        setBurger({
            ...burger,
            ingredients: {
                ...burger.ingredients,
                [orts]: burger.ingredients[orts] - 1
            },
            totalPrice: newPrice,
            purchasing: newPrice > 0

        });
    };
    return (
        <BurgerContext.Provider value={{ burger, addIngredients, removeIngredients, dataToFirebase, clearBurger }}>
            {props.children}
        </BurgerContext.Provider>
    );
};
export default BurgerContext;