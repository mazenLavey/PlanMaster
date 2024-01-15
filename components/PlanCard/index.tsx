"use client";

import { useContext } from "react";
import { PlansContext } from "@/contexts/PlansContext";
import Popup from "@/components/Popup";    
import PlanForm from "@/components/PlanForm";
import { PlanType } from "@/types/interfaces";
import { useToggle } from "@/hooks/useToggle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCircleCheck, faTrashCanArrowUp, faBoxArchive, faBoxOpen, faBroom } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { format } from "date-fns";
import ProgressBar from "@/components/ProgressBar";
import Tooltip from "@/components/Tooltip";
import "./index.scss";
import classNames from "classnames";

interface Props {
    data: PlanType,
    isActive?: boolean,
    isCurrent?: boolean,
}

const PlanCard: React.FC<Props> = ({
    data,
    isCurrent = false,
    isActive = true,
}) => {
    const { 
        showPlan, 
        deletePlan, 
        restorePlan, 
        archivePlan, 
        unarchivePlan,
        deletePlanForever,
    } = useContext(PlansContext);

    const [showPopup, handleToggle] = useToggle();
    const creationDate = format(data.timeStamp, 'dd MMM, yyyy');
    const tasksSum: number = data.tasks.length;
    const doneTasks: number = (data.tasks.filter(task => task.stage === "done")).length;
    const barWidth: number = (doneTasks/tasksSum)*100;

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        deletePlan(data.id);
    }

    const handleDeleteForever = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        deletePlanForever(data.id);
    }

    const handleShow = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        showPlan(data);
    }

    const handleRestore = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        restorePlan(data.id);
    }

    const handleUnarchive = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        unarchivePlan(data.id);
    }

    const handleArchive = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        archivePlan(data.id);
    }

    return (
        <>
        <div 
            className={classNames("PlanCard fade-in", { 
                "PlanCard--Current": isCurrent, 
            })} 
            onClick={handleShow}>
            <div className="PlanCard__Info">
                <h3 className="PlanCard__Title">{data.title? data.title : "new plan"}</h3>
                {isActive?
                    <div className="PlanCard__BtnContainer">
                        <Tooltip tooltipText="Edit plan">
                            <button onClick={()=> handleToggle()}><FontAwesomeIcon icon={faPen} /></button>
                        </Tooltip>
                    {
                        data.status ?
                        <Tooltip tooltipText="Move to archive">
                            <button onClick={handleArchive}><FontAwesomeIcon icon={faBoxArchive} color="#f67f5d"/></button>
                        </Tooltip>
                    :
                        <Tooltip tooltipText="Delete plan">
                            <button onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} /></button>
                        </Tooltip>
                    }
                    </div>
                    :
                    <>
                    {
                        data.status ?
                        <Tooltip tooltipText="Unarchive plan">
                            <button onClick={handleUnarchive}><FontAwesomeIcon icon={faBoxOpen} size="lg"/></button>
                        </Tooltip>
                        :
                        <div className="PlanCard__BtnContainer">
                            <Tooltip tooltipText="Restore plan">
                                <button onClick={handleRestore}><FontAwesomeIcon icon={faTrashCanArrowUp} size="lg"/></button>
                            </Tooltip>
                            <Tooltip tooltipText="Delete plan forever">
                                <button onClick={handleDeleteForever}><FontAwesomeIcon icon={faBroom} size="lg" color="#ff746d"/></button>
                            </Tooltip>
                        </div>
                    }
                </>
                }
            </div>
            <div className="PlanCard__Progress">
                <p className="PlanCard__ProgressText">{doneTasks} of {tasksSum} Tasks { data?.status && <FontAwesomeIcon icon={faCircleCheck} size="sm" color="#34C759"/>}</p>
                <ProgressBar barWidth={barWidth} startColor={data.barColors[0]} endColor={data.barColors[1]}/>
                <span className="PlanCard__Data">{creationDate}</span>
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