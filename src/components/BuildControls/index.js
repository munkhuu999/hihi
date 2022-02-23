import { buildQueries } from "@testing-library/dom";
import React, { useContext } from "react";
import BuildControl from "../BuildControl";
import styles from './style.module.css'
import BurgerContext from "../../context/burgerContext";

const BuildControls = (props) => {
    const contex = useContext(BurgerContext);

    const disabledIngredients = { ...contex.burger.ingredients };
    for (let key in disabledIngredients) {
        disabledIngredients[key] = disabledIngredients[key] <= 0;
    }
    return (
        <div className={styles.BuildControls}>
            <p>Бүргэрийн үнэ: <strong>{contex.burger.totalPrice}т</strong></p>
            {
                Object.keys(contex.burger.ingredients_name).map(el => {
                    return (
                        <BuildControl
                            keys={el}
                            disabledIngredients={disabledIngredients}
                            ortsNemeh={contex.addIngredients}
                            ortsHasah={contex.removeIngredients}
                            type={el}
                            orts={contex.burger.ingredients_name[el]} />
                    );
                })}
            <button
                onClick={props.showConfirmOrder}
                disabled={!contex.burger.purchasing}
                className={styles.OrderButton}
            >Захиалах</button>
            {/* <BuildControl
            disabledIngredients={props.disabledIngredients}
             ortsNemeh={props.ortsNemeh} 
             ortsHasah={props.ortsHasah} 
             type='salad' orts='Салад'/>
         <BuildControl 
             disabledIngredients={props.disabledIngredients}
             ortsNemeh={props.ortsNemeh} 
             ortsHasah={props.ortsHasah}
             type='bacon' orts='Гахайн мах'/>
         <BuildControl 
             disabledIngredients={props.disabledIngredients}
             ortsNemeh={props.ortsNemeh} 
             ortsHasah={props.ortsHasah}
             type='cheese' orts='Бяслаг'/>
         <BuildControl
             disabledIngredients={props.disabledIngredients}
             ortsNemeh={props.ortsNemeh} 
             ortsHasah={props.ortsHasah} 
             type='meat' orts='Үхрийн мах'/>       */}
        </div>

    );
};

export default BuildControls; 
