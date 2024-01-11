import styles from "./ProgressBar.module.scss";

type Props = {
    barWidth: string | number,
    startColor?: string,
    endColor?: string
}

const ProgressBar: React.FC<Props> = ({barWidth, startColor = "#333", endColor = "#888"}) => {
    return (
        <div className={styles.progress__box} >
            <span className={styles.progress__bar} style={{width: `${barWidth}%`, backgroundImage: `linear-gradient(to right, ${startColor} 50%, ${endColor})`}}></span>
        </div>
    )
};

export default ProgressBar;