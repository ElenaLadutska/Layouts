import { TABS } from './constants';

import styles from './Tabs.module.css';

const Tabs = () => (
  <div className={styles.wrapperTabs}>
    {TABS.map((tab, idx) => (
      <div key={idx} className={styles.tab}>{tab}</div>
    ))}
  </div>
)

export default Tabs;
