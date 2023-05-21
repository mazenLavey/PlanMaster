import Popup from "@/components/others/Popup";    
import PlanForm from "@/components/forms/PlanForm";
import { PlanType } from "@/types/interfaces";
import { useToggle } from "@/hooks/useToggle";
import styles from "@/styles/PlanCard.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import dateFormat from "@/functions/dateFormat";
import ProgressBar from "@/components/others/ProgressBar";

interface Props {
    data: PlanType,
    showPlan: (data: PlanType) => void,
    deletePlan: ()=> void
}

const PlanCard: React.FC<Props> = ({data, showPlan, deletePlan}) => {
    const [showPopup, handleToggle] = useToggle();
    const creationDate = dateFormat(data.timeStamp);
    const tasksSum: number = data.tasks.length;
    const doneTasks: number = (data.tasks.filter(task => task.stage === "done")).length;
    const barWidth: number = (doneTasks/tasksSum)*100;

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>): void {
        e.stopPropagation();
        deletePlan();
    }

    return (
        <>
        <div className={styles.wrapper} onClick={() => showPlan(data)}>
            <div className={styles.info}>
                <h3>{data.title}</h3>
                <div className={styles.btnContainer}>
                    <button onClick={()=> handleToggle()}><FontAwesomeIcon icon={faPen} /></button>
                    <button onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
            </div>
            <div className={styles.progress}>
                <p>{doneTasks} of {tasksSum} Tasks { barWidth === 100 && <FontAwesomeIcon icon={faCircleCheck} size="sm" style={{color: "#34C759"}}/>}</p>
                <ProgressBar barWidth={barWidth} startColor={data.barColors[0]} endColor={data.barColors[1]}/>
                <span className={styles.date}>{creationDate}</span>
            </div>
        </div>
        
        {showPopup && 
        <Popup closePopup={() => handleToggle(false)}>
            <PlanForm data={data} closePopup={() => handleToggle(false)}/>
        </Popup>
        }
        </>
    );
};

export default PlanCard;