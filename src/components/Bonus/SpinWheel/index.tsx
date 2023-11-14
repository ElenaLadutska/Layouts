import React, { useEffect, useRef, useState } from 'react';

import { ReactComponent as RepeatSVG } from '../../../assets/repeat-arrow.svg';
import { ReactComponent as Arrow } from '../../../icons/arrow.svg';

import styles from './Circle.module.css';

interface RotationValue {
  minDegree: number;
  maxDegree: number;
  value: number;
  box: number;
  index: number;
  rotation: string;
}

const rotationValues: RotationValue[] = [
  { minDegree: 0, maxDegree: 25, value: 100, box: 1, index: 4, rotation: '0deg' },
  { minDegree: 340, maxDegree: 360, value: 100, box: 1, index: 4, rotation: '0deg' },
  { minDegree: 26, maxDegree: 70, value: 50, box: 2, index: 2, rotation: '-45deg' },
  { minDegree: 71, maxDegree: 115, value: 20, box: 1, index: 1, rotation: '90deg' },
  { minDegree: 116, maxDegree: 160, value: 50, box: 2, index: 4, rotation: '225deg' },
  { minDegree: 161, maxDegree: 205, value: 2, box: 1, index: 3, rotation: '180deg' },
  { minDegree: 206, maxDegree: 250, value: 5, box: 2, index: 1, rotation: '135deg' },
  { minDegree: 251, maxDegree: 295, value: 15, box: 1, index: 2, rotation: '90deg' },
  { minDegree: 296, maxDegree: 339, value: 2, box: 2, index: 3, rotation: '45deg' },
];

const VALUES1: number[] = [20, 15, 2, 100];
const VALUES2: number[] = [5, 50, 20, 50];

const SpinWheel: React.FC = () => {
  const wheelRef = useRef<HTMLDivElement>(null); 
  const shadowRef = useRef<HTMLDivElement>(null); 
  const leftDotRef = useRef<HTMLDivElement>(null); 
  const rightDotRef = useRef<HTMLDivElement>(null); 
  const spinBtnRef = useRef<HTMLButtonElement>(null);
  const [currentSpan, setCurrentSpan] = useState<
    { box: number; index: number} | undefined
    >({box: 1, index: 4});
  
  const handleRotationValue = (value: number) => {
    const matchingRotationValue = rotationValues.find(
      (rotationValue) => rotationValue.minDegree <= value && value <= rotationValue.maxDegree
    );

    if (matchingRotationValue){
      const {box, index, rotation} = matchingRotationValue;
      setCurrentSpan({box, index});

      if (shadowRef.current && leftDotRef.current && rightDotRef.current) {
        leftDotRef.current.style.display = 'block';
        rightDotRef.current.style.display = 'block';
        shadowRef.current.style.transform = `rotate(${rotation})`;
      }
    }
  };

  useEffect(() => {
    const spinBtnCurrent = spinBtnRef.current;

    const spinBtnClickHandler = () => {
      setCurrentSpan({box: 0, index: 0});

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
          }
        };

        handleRotationValue(currentRotation);
      };

      const rotateWheel = () => {
        currentRotation += resultValue;

        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${currentRotation}deg)`;
        }

        if (leftDotRef.current && rightDotRef.current) {
          leftDotRef.current.style.display = 'none';
          rightDotRef.current.style.display = 'none';
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
        };
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
        <div ref={shadowRef} className={styles.shadow}>
          <div ref={leftDotRef} className={styles.leftDot}></div>
          <div ref={rightDotRef} className={styles.rightDot}></div>
        </div>

        <div className={styles.box1}>
          {
            currentSpan?.box === 1 
            ? VALUES1.map((value, index) => (
              <span key={index} 
                className={`${styles
                  [`span${[index + 1]}`]} ${currentSpan?.index === index + 1 
                    ? styles.active 
                    : ''}`}>
                <b>{value}</b>
              </span>)) 
            : VALUES1.map((value, index) => (
                <span key={index} className={styles[`span${[index + 1]}`]}>
                  <b>{value}</b>
                </span>))
          }
        </div>

        <div className={styles.box2}>
        {
            currentSpan?.box === 2 
            ? VALUES2.map((value, index) => (
              <span key={index} 
                className={`${styles[
                  `span${[index + 1]}`]} ${currentSpan?.index === index + 1 
                    ? styles.active 
                    : ''}`}>
                <b>{value}</b>
              </span>)) 
            : VALUES2.map((value, index) => (
                <span key={index} className={styles[`span${[index + 1]}`]}>
                  <b>{value}</b>
                </span>))
          }
        </div>
      </div>

      <div className={styles.spinContainer}>
        <div className={styles.spinButton}>
          <button ref={spinBtnRef} id={styles.spinSVG}>
            <RepeatSVG />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
