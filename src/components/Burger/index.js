import React from 'react';
import { BurgerIngredient } from '../BurgerIngredient'
import styles from './style.module.css'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const Burger = (props) => {

    let data = Object.entries(props.orts);
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
const mapStateToProps = state => {
    return {
        orts: state.burgerReducer.ingredients
    };
};
export default connect(mapStateToProps)(withRouter(Burger));