import React from 'react'
import styles from './style.module.css';

export const BurgerIngredient = props => {
 
   if (props.type ==='breadtop'){
       return(
        <div className={styles.breadtop}>
          <div className={`${styles.seed} ${styles.second}`}></div>
          <div className={`${styles.seed} ${styles.third}`}></div>
          <div className={`${styles.seed} ${styles.fourth}`}></div>
          <div className={styles.seed}></div>        
        </div>
        
       );
   }
   if (props.type ==='seed') return <div className={styles.seed}></div>;
   if (props.type ==='second') return <div className={styles.second}></div>;
   if (props.type ==='third') return <div className={styles.third}></div>;
   if (props.type ==='salad') return <div className={styles.salad}></div>;
   if (props.type ==='bacon') return <div className={styles.bacon}></div>;
   if (props.type ==='cheese') return <div className={styles.cheese}></div>;
   if (props.type ==='meat') return <div className={styles.meat}></div>;   
   if (props.type ==='breadbottom') return <div className={styles.breadbottom}></div>;
   return  <div>........</div>;
};
