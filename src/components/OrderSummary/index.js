import React, { useContext } from "react";
import Button from "../General/Button";
import BurgerContext from "../../context/burgerContext";


const OrderSummary = (props) => {
    const contex = useContext(BurgerContext);
    return (
        <div>
            <h3>Таны захиалга</h3>
            <p>Таны сонгосон орцууд:</p>
            <ul>
                {Object.keys(contex.burger.ingredients).map(el => <li key={el}>{contex.burger.ingredients_name[el]}: {contex.burger.ingredients[el]}</li>)}
            </ul>
            <p><strong>Захиалгын дүн: {contex.burger.totalPrice}т</strong></p>
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
export default OrderSummary;