import React, { useState } from "react";
import Spinner from '../../components/General/Spinner';
import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from '../../components/General/Modal';
import styles from './style.module.css';
import OrderSummary from "../../components/OrderSummary";

const BurgerBuilder = (props) => {
  const [ConfirmOrder, setConfirmOrder] = useState(false);

  const continueOrder = () => {
    props.history.push('/shipping');
    CloseConfirmOrder();
  }

  const showConfirmOrder = () => {
    setConfirmOrder(true);
  };
  const CloseConfirmOrder = () => {
    setConfirmOrder(false);
  };

  return (
    <div className={styles.BurgerBuild}>
      <Modal
        CloseConfirmOrder={CloseConfirmOrder}
        show={ConfirmOrder}>
        <OrderSummary
          onCancel={CloseConfirmOrder}
          onContinue={continueOrder}
        />
      </Modal >
      <Burger />
      <BuildControls
        showConfirmOrder={showConfirmOrder}
      />
    </div>
  );

}
export default BurgerBuilder; 