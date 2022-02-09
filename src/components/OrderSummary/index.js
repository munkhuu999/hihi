import React from "react";
import Button from "../General/Button";
import { connect } from 'react-redux';


const OrderSummary = (props) => {
    return (
        <div>
            <h3>Таны захиалга</h3>
            <p>Таны сонгосон орцууд:</p>
            <ul>
                {Object.keys(props.ingredients).map(el => <li key={el}>{props.ingredients_name[el]}: {props.ingredients[el]}</li>)}
            </ul>
            <p><strong>Захиалгын дүн: {props.price}т</strong></p>
            <p> Үргэлжлүүлэх үү? </p>
            <Button
                daragdsan={props.onCancel}
                btnType='Danger'
                text='Татгалзах' />
            <Button
                daragdsan={props.onContinue}
                btnType='Success'
                text='Үргэлжлүүлэх' />
        </div>
    );
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        ingredients_name: state.burgerReducer.ingredients_name
    }
};
export default connect(mapStateToProps)(OrderSummary);