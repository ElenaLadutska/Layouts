import React, { useEffect, useRef } from 'react';

import { ReactComponent as RepeatSVG } from '../../../assets/repeat.svg';
import { ReactComponent as Arrow } from '../../../icons/arrow.svg';
import { ReactComponent as Stars } from '../../../icons/stars.svg';

import styles from './Circle.module.css';

interface RotationValue {
  minDegree: number;
  maxDegree: number;
  value: number;
};

const rotationValues: RotationValue[] = [
  { minDegree: 340, maxDegree: 385, value: 100 },
  { minDegree: 26, maxDegree: 70, value: 50 },
  { minDegree: 71, maxDegree: 115, value: 20 },
  { minDegree: 116, maxDegree: 160, value: 50 },
  { minDegree: 161, maxDegree: 205, value: 2 },
  { minDegree: 206, maxDegree: 250, value: 5 },
  { minDegree: 251, maxDegree: 295, value: 15 },
  { minDegree: 296, maxDegree: 339, value: 20 },
];

const VALUES1:number[] = [20, 15, 2, 100];
const VALUES2:number[] = [5,50,20,50];

const SpinWheel: React.FC = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const spinBtnRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const spinBtnCurrent = spinBtnRef.current;

    const spinBtnClickHandler = () => {
      if (spinBtnCurrent) {
        spinBtnCurrent.disabled = true;
      }

      let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
      let currentRotation = 0;
      let count = 0;
      let resultValue = 101;

      const valueGenerator = (angleValue: number) => {
        for (let i of rotationValues) {
          if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            resultValue = i.value;

            if (spinBtnCurrent) {
              spinBtnCurrent.disabled = false;
            };

            break;
          };
        };
      };

      const rotateWheel = () => {
        currentRotation += resultValue;

        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${currentRotation}deg)`;
        }

        if (currentRotation >= 360) {
          count += 1;
          resultValue -= 5;
          currentRotation = 0;
        } else if (count > 15 && currentRotation === randomDegree) {
          valueGenerator(randomDegree);
          clearInterval(rotationInterval);

          count = 0;
          resultValue = 101;
        }
      };

      const rotationInterval = window.setInterval(rotateWheel, 10);
    };

    spinBtnCurrent?.addEventListener('click', spinBtnClickHandler);

    return () => {
      spinBtnCurrent?.removeEventListener('click', spinBtnClickHandler);
    };
  }, []);

  return (
    <div className={styles.wrapperCircle}>
      <div className={styles.header}>
        <h1>Spin the Wheel</h1>
        <p>and win coupons</p>
      </div>

      <Arrow className={styles.arrow} />

      <div className={styles.wheelWrapper} ref={wheelRef}>
        <div className={styles.shadow}></div>
        <div className={styles.box1}>
          {
            VALUES1.map((value, index) => (
              <span key={index}
                className={styles[`span${[index + 1]}`]}
              >
                <b>{value}</b>
              </span>
            ))
          }
        </div>

        <div className={styles.box2}>
          {
            VALUES2.map((value, index) => (
              <span key={index}
                className={styles[`span${[index + 1]}`]}>
                <b>{value}</b>
              </span>
            ))
          }
        </div>

      </div>
      <div className={styles.spinContainer}>
          <Stars className={styles.stars} />

          <button ref={spinBtnRef} id={styles.spinButton}>
            <RepeatSVG />
          </button>
        </div>
    </div>
  );
};

export default SpinWheel;