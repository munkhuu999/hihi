import React, { useContext } from 'react';
import styles from './style.module.css';
import burgerContext from '../../context/burgerContext';


const BuildControl = (props) => {
    const appbar = useContext(burgerContext);

    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.orts}</div>
            <button
                className={styles.More}
                onClick={() => props.ortsNemeh(props.type)} >Нэмэх</button>
            <button
                disabled={props.disabledIngredients[props.type]}
                className={styles.Less}
                onClick={() => props.ortsHasah(props.type)}>Хасах </button>
        </div>
    );
}
export default BuildControl;
