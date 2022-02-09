import React from 'react'
import Burger from '../../components/Burger';
import styles from './style.module.css';
import Button from '../../components/General/Button';
import ContactData from '../../components/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class ShippningPage extends React.Component {

    goBack = () => {
        this.props.history.goBack();
    }
    ShowContactData = () => {
        this.props.history.replace('/shipping/contact');
    }
    render() {
        return (
            <div className={styles.ShippningPage}>
                <p style={{ fontSize: '25px', paddingTop: '18px' }}><strong>Таны захиалга амттай болно гэж найдаж байна.</strong> </p>
                <p ><strong>Нийт үнэ: {this.props.price}</strong> </p>
                <Burger />
                <Button
                    text='Захиалгыг цуцлах'
                    daragdsan={this.goBack}
                    btnType='Danger'
                />
                <Button
                    text='Хүргэлтийн мэдээлэл оруулах'
                    daragdsan={this.ShowContactData}
                    btnType='Success'
                />
                {/* <Route ар 2 янзааар мэдээлэл дамжуулж болно */}
                <Route path='/shipping/contact'>
                    <ContactData />
                </Route>
                {/* <Route path='/shipping/contact' render={()=>(
                              <ContactData 
                                        ingredients={this.state.ingredients}
                                        price={this.state.price}  />)} />          */}

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        price: state.burgerReducer.totalPrice
    };
};
export default connect(mapStateToProps)(ShippningPage);