import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {ReactComponent as RepeatSVG} from '../../../assets/repeat.svg';
import {ReactComponent as Arrow} from '../../../icons/spinner-arrow.svg';
import {ReactComponent as Stars} from '../../../icons/stars.svg';

import styles from './Circle.module.css';

const rotationValues = [
  { minDegree: 0, maxDegree: 45, value: 100 },
  { minDegree: 46, maxDegree: 90, value: 5 },
  { minDegree: 91, maxDegree: 135, value: 15 },
  { minDegree: 136, maxDegree: 180, value: 20 },
  { minDegree: 181, maxDegree: 225, value: 2 },
  { minDegree: 226, maxDegree: 270, value: 20 },
  { minDegree: 271, maxDegree: 315, value: 50 },
  { minDegree: 316, maxDegree: 360, value: 5 },
];

const pieColors = [
  "#723CFF",
  "#63BCFF",
  "#723CFF",
  "#63BCFF",
  "#723CFF",
  "#63BCFF",
  "#723CFF",
  "#FFB436",
];

const SpinWheel: React.FC = () => {
  const wheelRef = useRef<HTMLCanvasElement | null>(null);
  const spinBtnRef = useRef<HTMLButtonElement>(null);
  const chartRef = useRef<Chart | null>(null); 

  useEffect(() => {
    if (wheelRef.current) {
      const ctx = wheelRef.current.getContext('2d');

      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        };

        const myChart = new Chart(ctx, {
          plugins: [ChartDataLabels],
          type: 'pie',
          data: {
            labels: [20, 15, 5, 10, 2, 20, 50, 100],
            datasets: [
              {
              backgroundColor: pieColors,
              data: [12, 12, 12, 12, 12, 12, 12, 12],
              },
          ],
          },
          options: {
            responsive: true,
            animation: { duration: 0 },
            plugins: {
              legend: {
              display: false,
              },
              datalabels: {
                color: '#ffffff',
                formatter: (_, context: any) => (context.chart?.data?.labels?.[context.dataIndex] ?? '').toString(),
                font: { size: 30, weight: 'bold', family: 'Satisfy'},
                rotation: function (context) {
                  const rotations = [-70, -20, 20, -110, -5, -20, 10, 245];

                  return rotations[context.dataIndex];
                },                
              },
            },
          },
        });

        chartRef.current = myChart;

        let count = 0;
        let resultValue = 101;

        const valueGenerator = (angleValue: number) => {
          for (let i of rotationValues) {
            if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
              resultValue = i.value;
              break;
            }
          }
        };

        const spinBtnClickHandler = () => {
          let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

          let rotationInterval = window.setInterval(() => {
            (myChart.options as any).rotation = (myChart.options as any).rotation + resultValue;

            myChart.update();

            if ((myChart.options as any).rotation  >= 360) {
              count += 1;
              resultValue -= 5;
              (myChart.options as any).rotation  = 0;
            } else if (count > 15 && (myChart.options as any).rotation  === randomDegree) {
              valueGenerator(randomDegree);
              clearInterval(rotationInterval);
              count = 0;
              resultValue = 101;
            }
          }, 10);
        };

        if (spinBtnRef?.current) {
          spinBtnRef.current.addEventListener("click", spinBtnClickHandler);
        }
      };
  }
  }, []);
  
  return (
    <div className={styles.wrapperCircle}>
      <div className={styles.header}>
        <h1>Spin the Wheel</h1>
        <p>and win coupons</p>
      </div>


      <div className={styles.wheelWrapper}>
          <canvas id={styles.wheel} ref={wheelRef}></canvas>

          <Arrow className={styles.arrow} />

        <div className={styles.spinContainer}>
          <Stars className={styles.stars}/>
          
          <button ref={spinBtnRef} id={styles.spinButton}>
            <RepeatSVG />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;