import React, { useContext } from 'react'
import Burger from '../../components/Burger';
import styles from './style.module.css';
import Button from '../../components/General/Button';
import ContactData from '../../components/ContactData';
import { Route } from 'react-router-dom';
import BurgerContext from '../../context/burgerContext';

const ShippningPage = props => {
    const contex = useContext(BurgerContext);
    const goBack = () => {
        props.history.goBack();
    }
    const ShowContactData = () => {
        props.history.replace('/shipping/contact');
    }
    return (
        <div className={styles.ShippningPage}>
            <p style={{ fontSize: '25px', paddingTop: '18px' }}><strong>Таны захиалга амттай болно гэж найдаж байна.</strong> </p>
            <p ><strong>Нийт үнэ: {contex.burger.totalPrice}</strong> </p>
            <Burger />
            <Button
                text='Захиалгыг цуцлах'
                daragdsan={goBack}
                btnType='Danger'
            />
            <Button
                text='Хүргэлтийн мэдээлэл оруулах'
                daragdsan={ShowContactData}
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
};
export default ShippningPage;