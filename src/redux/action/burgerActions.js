export const AddIngredient = ortsNemeh => {
    return {
        type: 'ADD_INGREDIENTS',
        nemehOrts: ortsNemeh
    };
};
export const RemoveIngredient = ortsNem => {
    return {
        type: 'REMOVE_INGREDIENTS',
        ortsNem
    };
};