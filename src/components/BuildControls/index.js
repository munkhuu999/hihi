import { buildQueries } from "@testing-library/dom";
import React from "react";
import BuildControl from "../BuildControl";
import styles from './style.module.css'
import { connect } from 'react-redux';
import * as actions from "../../redux/action/burgerActions";

const BuildControls = (props) => {
    const disabledIngredients = { ...props.burgeriinOrts };
    for (let key in disabledIngredients) {
        disabledIngredients[key] = disabledIngredients[key] <= 0;
    }
    return (
        <div className={styles.BuildControls}>
            <p>Бүргэрийн үнэ: <strong>{props.totalPrice}т</strong></p>
            {
                Object.keys(props.ingredients_name).map(el => {
                    return (
                        <BuildControl
                            keys={el}
                            disabledIngredients={disabledIngredients}
                            ortsNemeh={props.ortsNemeh}
                            ortsHasah={props.ortsHasah}
                            type={el} orts={props.ingredients_name[el]} />
                    );
                })}
            <button
                onClick={props.showConfirmOrder}
                disabled={!props.purchasing}
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
const mapStateToProps = state => {
    return {
        burgeriinOrts: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        purchasing: state.burgerReducer.purchasing,
        ingredients_name: state.burgerReducer.ingredients_name
    };
};
const mapDispatchToState = dispatch => {
    return {
        ortsNemeh: ortsNem => dispatch(actions.AddIngredient(ortsNem)),
        ortsHasah: ortsNem => dispatch(actions.RemoveIngredient(ortsNem)),
    };
};
export default connect(mapStateToProps, mapDispatchToState)(BuildControls); 
