import React, { Component } from "react";
import Spinner from '../../components/General/Spinner';


import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from '../../components/General/Modal';
import styles from './style.module.css';
import OrderSummary from "../../components/OrderSummary";


class BurgerBuilder extends Component {

  state = {
    ConfirmOrder: false,
    lastCustomer: 'no customers',
    loading: false
  };

  continueOrder = () => {
    this.props.history.push('/shipping');
    this.CloseConfirmOrder();
  }

  showConfirmOrder = () => {
    this.setState({ ConfirmOrder: true });
  };
  CloseConfirmOrder = () => {
    this.setState({ ConfirmOrder: false });
  };


  render() {

    return (
      <div className={styles.BurgerBuild}>
        <Modal
          CloseConfirmOrder={this.CloseConfirmOrder}
          show={this.state.ConfirmOrder}>
          {this.state.loading ?
            <Spinner /> : (
              <OrderSummary
                onCancel={this.CloseConfirmOrder}
                onContinue={this.continueOrder}
              />)}

        </Modal >
        {this.state.loading && <Spinner />}
        <p style={{ width: '100%', textAlign: 'center', fontSize: '25px' }}>
          Сүүлчийн захиалагч: {this.state.lastCustomer}
        </p>
        <Burger />
        <BuildControls
          showConfirmOrder={this.showConfirmOrder}
        />
      </div>
    );
  }
}
export default BurgerBuilder; 