import {ReactComponent as Union} from '../../icons/Union.svg';
import BonusDescription from "./BonusDescription";
import Tabs from "./Tabs";

import styles from './Bonus.module.css';

const Bonus = () => (
  <div>
    <div className={styles.title}>
      <Union />
      
      <p>Bonus Cabinet</p> 
    </div>

    <Tabs />

    <BonusDescription />

    <button>Activate Bonus Pack</button>
  </div>
);

export default Bonus;
