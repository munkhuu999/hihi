import React, { useContext, useMemo } from 'react';
import { BurgerIngredient } from '../BurgerIngredient'
import styles from './style.module.css'
import BurgerContext from '../../context/burgerContext';


const Burger = (props) => {
    const context = useContext(BurgerContext);
    let data = Object.entries(context.burger.ingredients);
    let content = [];

    data.map((el, index) => {
        for (let i = 0; i < el[1]; i++) {
            content.push(<BurgerIngredient key={`${index + 1}${i}`} type={el[0]} />);
        };
    });
    if (content.length === 0)
        content = <p> Та талхныхаа хачирыг оруулна уу! . . . . </p>;

    return (
        <div className={styles.burger}>
            <BurgerIngredient type='breadtop' />
            {content}
            <BurgerIngredient type='breadbottom' />
        </div>
    )
}
export default Burger;