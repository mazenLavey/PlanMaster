"use client";

import { useContext, useState } from 'react';
import { PlansContext } from '@/contexts/PlansContext';
import { useToggle } from '@/hooks/useToggle';
import { TaskType, OperationType, TaskStage } from '@/types/interfaces';
import Popup from '@/components/Popup';
import TaskInfo from '@/components/TaskInfo';
import TaskForm from '@/components/TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faXmark, faPen, faCheck, faRotateLeft, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faCircleStop } from '@fortawesome/free-regular-svg-icons';
import Tooltip from '@/components/Tooltip';
import classNames from 'classnames';
import './index.scss';

interface Props {
    taskData: TaskType,
    planId: string,
}

const TaskCard: React.FC<Props> = ({taskData, planId})=>{
    const {updataTask, deleteTask} = useContext(PlansContext);
    const [showPopup, handleToggle] = useToggle();
    const [task] = useState<TaskType>(taskData);
    const checkAllDone = task.subTasks.every(subtask => subtask.status === true);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        const target = e.currentTarget;
        const actionType: OperationType = target.dataset.type as OperationType;

        if(actionType === "delete") {
            deleteTask(planId, task.id);
        } else {
            let toStage: TaskStage = task.stage;

            if(actionType === "start") {
                toStage = "inProcess";
            } else if(actionType === "stop") {
                toStage = "toDo";
            } else if(actionType === "done") {
                if(checkAllDone) {
                    toStage = "done";
                }
            } else if(actionType === "undo") {
                toStage = "inProcess";
            }

            const updatedTask: TaskType = {
                ...task,
                stage: toStage
            }
            updataTask(planId, updatedTask);
        } 
    };

    return (
        <>
            <div className="TaskCard">
                <div className="TaskCard__BtnWrapper">
                    {task?.stage === "toDo"?
                        <>
                            <button className="TaskCard__Btn" data-type='start' onClick={handleClick}>
                                <FontAwesomeIcon icon={faFlagCheckered} />
                                start
                            </button>
                            <button className="TaskCard__Btn" onClick={()=> handleToggle()}>
                                <FontAwesomeIcon icon={faPen} />
                                edit
                            </button>
                            <Tooltip className='TaskCard__BtnTooltip' tooltipText="Delete task">
                                <button className="TaskCard__Btn" data-type='delete' onClick={handleClick} title='Delete task'>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </Tooltip>
                        </>
                    :task?.stage === "inProcess"?
                        <>
                            <button 
                                className={classNames("TaskCard__Btn", {
                                    "TaskCard__Btn--Disabled": !checkAllDone,
                                })} 
                                data-type='done' 
                                onClick={handleClick}>
                                <FontAwesomeIcon icon={faCheck} />
                                check
                            </button>
                            <button className="TaskCard__Btn" onClick={()=> handleToggle()}>
                                <FontAwesomeIcon icon={faPen} />
                                edit
                            </button>
                            <Tooltip className='TaskCard__BtnTooltip' tooltipText="Stop task">
                                <button className="TaskCard__Btn" data-type='stop' onClick={handleClick}>
                                    <FontAwesomeIcon icon={faCircleStop} />
                                </button>
                            </Tooltip>
                        </>
                    :
                        <>
                            <button className="TaskCard__Btn TaskCard__Btn--Done">
                                <FontAwesomeIcon icon={faCircleCheck} />
                                done
                            </button>
                            <button className="TaskCard__Btn" data-type='undo' onClick={handleClick}>
                                <FontAwesomeIcon icon={faRotateLeft} />
                                undo
                            </button>
                        </>
                    }
                </div>
                <TaskInfo taskData={task} planId={planId} />
            </div>
            {
                showPopup &&
                <Popup closePopup={()=> handleToggle(false)}>
                    <TaskForm taskData={task} currentPlanId={planId} action='edit'/>
                </Popup>
            }
        </>
    );
};

export default TaskCard;