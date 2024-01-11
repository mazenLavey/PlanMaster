import { PlanType } from "@/types/interfaces";
import AddNewTask from "@/components/AddNewTask";
import ProgressBar from "@/components/ProgressBar";
import Popup from "@/components/Popup";
import PlanForm from "@/components/PlanForm";
import TaskSection from "./TaskSection";
import { useToggle } from "@/hooks/useToggle";
import dateFormat from "@/functions/dateFormat";
import daysFromDates from "@/functions/daysFromDates";
import { getBarWidthFromDate } from "@/functions/getBarWidthFromDate";
import styles from "@/styles/CurrentPlan.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
    currentPlanData: PlanType
}

const CurrentPlan: React.FC<Props> = ({currentPlanData}) => {
    const [showPopup, handleToggle] = useToggle();
    const creationDate = dateFormat(currentPlanData.timeStamp);
    const days = daysFromDates(creationDate, currentPlanData.deadline);
    const barWidth = getBarWidthFromDate(creationDate, currentPlanData.deadline);

    const titleText = currentPlanData?.title ? currentPlanData.title: "new plan";

    return (
        <>
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h2 className={styles.title}>{titleText}</h2>
                <AddNewTask currentPlanId={currentPlanData?.id}/>
            </header>
            <div className={styles.info}>
                <p className={styles.description}>{currentPlanData?.description}</p>
            </div>
            <div className={styles.limitation}>
                {currentPlanData?.deadline ?
                <>
                    <span className={styles.badge}>
                        days: {days}
                    </span>
                    <span className={`${styles.badge} ${styles.deadline}`}>
                        dealline: {currentPlanData.deadline}
                    </span>
                </>
                :
                <button onClick={()=> handleToggle()} className={`${styles.badge} ${styles.btn}`}>
                    <FontAwesomeIcon icon={faPlus} />
                    deadline
                </button>
                }
            </div>
            <ProgressBar barWidth={barWidth} startColor="#3ed364" endColor="#ff746d"/>

            <main className={styles.list}>
                <TaskSection currentPlanData={currentPlanData} section="toDo"/>
                <TaskSection currentPlanData={currentPlanData} section="inProcess"/>
                <TaskSection currentPlanData={currentPlanData} section="done"/>
            </main>
        </div>

        {showPopup && 
            <Popup closePopup={() => handleToggle(false)}>
                <PlanForm data={currentPlanData} closePopup={() => handleToggle(false)}/>
            </Popup>
        }
        </>
    );
};

export default CurrentPlan;