"use client";

import Popup from "@/components/Popup";    
import PlanForm from "@/components/PlanForm";
import { PlanType } from "@/types/interfaces";
import { useToggle } from "@/hooks/useToggle";
import styles from "./PlanCard.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCircleCheck, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import dateFormat from "@/functions/dateFormat";
import ProgressBar from "@/components/ProgressBar";
import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import Tooltip from "@/components/Tooltip";

interface Props {
    data: PlanType,
    isDeleted?: boolean,
}

const PlanCard: React.FC<Props> = ({
    data,
    isDeleted = false
}) => {
    const { showPlan, deletePlan, restorePlan } = useContext(PlansContext);

    const [showPopup, handleToggle] = useToggle();
    const creationDate = dateFormat(data.timeStamp);
    const tasksSum: number = data.tasks.length;
    const doneTasks: number = (data.tasks.filter(task => task.stage === "done")).length;
    const barWidth: number = (doneTasks/tasksSum)*100;

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>): void {
        e.stopPropagation();
        deletePlan(data.id);
    }

    function handleShow(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
        showPlan(data);
    }

    function handleRestore(e: React.MouseEvent<HTMLButtonElement>): void {
        e.stopPropagation();
        restorePlan(data.id);
    }

    return (
        <>
        <div className={`${styles.wrapper} fade-in`} onClick={handleShow}>
            <div className={styles.info}>
                <h3>{data.title? data.title : "new plan"}</h3>
                {isDeleted?
                    <Tooltip tooltipText="Restore plan">
                        <button onClick={handleRestore}><FontAwesomeIcon icon={faTrashCanArrowUp} size="lg"/></button>
                    </Tooltip>
                    :
                    <div className={styles.btnContainer}>
                        <Tooltip tooltipText="Edit plan">
                            <button onClick={()=> handleToggle()}><FontAwesomeIcon icon={faPen} /></button>
                        </Tooltip>

                        <Tooltip tooltipText="Delete plan">
                            <button onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} /></button>
                        </Tooltip>
                    </div>
                }
            </div>
            <div className={styles.progress}>
                <p>{doneTasks} of {tasksSum} Tasks { data?.status && <FontAwesomeIcon icon={faCircleCheck} size="sm" style={{color: "#34C759"}}/>}</p>
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