"use client";

import { useContext, useState } from 'react';
import { PlansContext } from '@/contexts/PlansContext';
import { useToggle } from '@/hooks/useToggle';
import { TaskType, OperationType, TaskStage } from '@/types/interfaces';
import styles from '@/styles/TaskCard.module.scss';
import Popup from '../others/Popup';
import TaskInfo from '../forms/TaskInfo';
import TaskForm from '../forms/TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faXmark, faPen, faCheck, faRotateLeft, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faCircleStop } from '@fortawesome/free-regular-svg-icons';

interface Props {
    taskData: TaskType,
    planId: string,
}

const TaskCard: React.FC<Props> = ({taskData, planId})=>{
    const {updataTask, deleteTask} = useContext(PlansContext);
    const [showPopup, handleToggle] = useToggle();
    const [task] = useState<TaskType>(taskData);
    const checkAllDone = task.subTasks.every(subtask => subtask.status === true);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
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
            <div className={styles.wrapper}>
                <div className={styles.buttons}>
                    {task?.stage === "toDo"?
                        <>
                            <button data-type='start' onClick={handleClick}>
                                <FontAwesomeIcon icon={faFlagCheckered} />
                                start
                            </button>
                            <button onClick={()=> handleToggle()}>
                                <FontAwesomeIcon icon={faPen} />
                                edit
                            </button>
                            <button data-type='delete' onClick={handleClick} title='Delete task'>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </>
                    :task?.stage === "inProcess"?
                        <>
                            <button data-type='done' onClick={handleClick} className={`${checkAllDone? "": styles.btnDisabled}`}>
                                <FontAwesomeIcon icon={faCheck} />
                                check
                            </button>
                            <button onClick={()=> handleToggle()}>
                                <FontAwesomeIcon icon={faPen} />
                                edit
                            </button>
                            <button data-type='stop' onClick={handleClick} title='Stop task'>
                                <FontAwesomeIcon icon={faCircleStop} />
                            </button>
                        </>
                    :
                        <>
                            <div className={styles.done}>
                                <FontAwesomeIcon icon={faCircleCheck} />
                                done
                            </div>
                            <button data-type='undo' onClick={handleClick}>
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