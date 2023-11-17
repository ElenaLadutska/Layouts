import React from 'react';

import { ReactComponent as Arrow } from '../../../icons/arrow.svg';

import styles from './Circle.module.css';

const COLORS = [
  [255, 180, 54, 1],
  [114, 60, 255, 1],
  [99, 188, 255, 1],
];

const VALUES = [1, 2, 3, 4, 5, 6, 7, 8];

const SpinWheel: React.FC = () => {
  const getDivStyle = (idx: number) => {
    const background = idx === 0
      ? `rgba(${COLORS[0].join(", ")})`
      : idx % 2 === 1
      ? `rgba(${COLORS[1].join(", ")})`
      : `rgba(${COLORS[2].join(", ")})`;
  
    return { background };
  }

  return (
    <div className={styles.wrapperCircle}>
      <div className={styles.header}>
        <h1>Spin the Wheel</h1>
        <p>and win coupons</p>
      </div>

      <Arrow className={styles.arrow} />

      <div 
        className={styles.wheelWrapper} 

      >
        <div className={styles.values}>
        {VALUES.map((value, idx) => (
          <div key={idx} className={styles.value}
            style={getDivStyle(idx)}>
            {value}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;