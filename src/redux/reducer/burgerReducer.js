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
    }
};
const INGREDIENT_PRICES = { salad: 150, cheese: 250, bacon: 800, meat: 1500 };

const reducer = (state = intialState, action) => {
    if (action.type === 'ADD_INGREDIENTS') {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.nemehOrts]: state.ingredients[action.nemehOrts] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.nemehOrts],
            purchasing: true
        }
    }
    else if (action.type === 'REMOVE_INGREDIENTS') {
        // төлөвийн мэдээллийг авах шинчилхээс өмнө
        const newPrice = state.totalPrice - INGREDIENT_PRICES[action.ortsNem];
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ortsNem]: state.ingredients[action.ortsNem] - 1
            },
            totalPrice: newPrice,
            purchasing: newPrice > 0
        }
    }

    return state;
};
export default reducer;