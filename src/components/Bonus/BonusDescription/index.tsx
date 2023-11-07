import { BONUS_DESCRIPTION } from './constants';
import styles from './BonusDescription.module.css';

const BonusDescription = () => (
  <div className={styles.wrapperBonusDescription}>
    {
      BONUS_DESCRIPTION.map(({title, requirements, details, experationTime, experationTimeValue, path}, idx) => (
        <div className={styles.bonusContainer} key={idx}>
          <div className={styles.image}
            style={{
              background:`url(${path}), lightgray 50% / cover no-repeat`,
            }}>
          </div>

          <div className={styles.content}>
            <div className={styles.title}>{title}</div>

            {requirements.map(({minimumDep, minimumDepValue, wager, wagerValue}, idx) => (
              <div className={styles.description} key={idx}>
                <div className={styles.textContent}>
                  <div className={styles.textLeft}>{minimumDep}</div>
                  <div className={styles.textRight}>{minimumDepValue}</div>
                </div>

                <div className={styles.textContent}>
                  <div className={styles.textLeft}>{wager}</div>
                  <div className={styles.textRight}>{wagerValue}</div>
                </div>
              </div>
              ))}

            <a href="http://" className={styles.details}>{details}</a>

            <div className={styles.footer}>
              <div className={styles.textContent}>
                <div className={styles.experationTime}>{experationTime}</div>
                <div>{experationTimeValue}</div>
              </div>

              <div className={styles.progressBar}>
                <div className={styles.done}></div>
              </div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
)

export default BonusDescription;
