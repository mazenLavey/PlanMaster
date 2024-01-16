"use client";

import { useContext, useEffect, useState } from 'react';
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
import { OPERATIONS_TYPES, TASK_STAGES } from '@/constants';
import './index.scss';

interface Props {
    taskData: TaskType,
    planId: string,
}

const TaskCard: React.FC<Props> = ({taskData, planId})=>{
    const {updataTask, deleteTask} = useContext(PlansContext);

    const [showPopup, handleToggle] = useToggle();
    const [task, setTask] = useState<TaskType | null>(null);
    const [isAllDone, setIsAllDone] = useState<boolean>(false);

    useEffect(() => {
        if(!taskData) return;

        const checkAllDone = taskData.subTasks.every(subtask => subtask.status === true);

        setIsAllDone(checkAllDone);
        setTask(taskData);
    }, [taskData]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        if(!task) return;

        const target = e.currentTarget;
        const actionType: OperationType = target.dataset.type as OperationType;

        if(actionType === OPERATIONS_TYPES.delete) {
            deleteTask(planId, task.id);
            return;
        } 
        
        let toStage: TaskStage = task.stage;

        if(actionType === OPERATIONS_TYPES.start || actionType === OPERATIONS_TYPES.undo) {
            toStage = TASK_STAGES.inProcess;

        } else if(actionType === OPERATIONS_TYPES.stop) {
            toStage = TASK_STAGES.toDo;

        } else if(actionType === OPERATIONS_TYPES.done && isAllDone) {
            toStage = TASK_STAGES.done;
        } 

        const updatedTask: TaskType = {
            ...task,
            stage: toStage
        };

        updataTask(planId, updatedTask);
    };

    return (
        <>
            <div className="TaskCard fade-in">
                <div className="TaskCard__BtnWrapper">
                    {task?.stage === TASK_STAGES.toDo?
                        <>
                            <button className="TaskCard__Btn" data-type={OPERATIONS_TYPES.start} onClick={handleClick}>
                                <FontAwesomeIcon icon={faFlagCheckered} />
                                start
                            </button>
                            <button className="TaskCard__Btn" onClick={()=> handleToggle()}>
                                <FontAwesomeIcon icon={faPen} />
                                edit
                            </button>
                            <Tooltip className='TaskCard__BtnTooltip' tooltipText="Delete task">
                                <button className="TaskCard__Btn" data-type={OPERATIONS_TYPES.delete} onClick={handleClick}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </Tooltip>
                        </>
                    :task?.stage === TASK_STAGES.inProcess?
                        <>
                            <button 
                                className={classNames("TaskCard__Btn", {
                                    "TaskCard__Btn--Disabled": !isAllDone,
                                    })} 
                                data-type={OPERATIONS_TYPES.done}
                                onClick={handleClick}>
                                <FontAwesomeIcon icon={faCheck} />
                                check
                            </button>
                            <button className="TaskCard__Btn" onClick={()=> handleToggle()}>
                                <FontAwesomeIcon icon={faPen} />
                                edit
                            </button>
                            <Tooltip className='TaskCard__BtnTooltip' tooltipText="Stop task">
                                <button className="TaskCard__Btn" data-type={OPERATIONS_TYPES.stop} onClick={handleClick}>
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
                            <button className="TaskCard__Btn" data-type={OPERATIONS_TYPES.undo} onClick={handleClick}>
                                <FontAwesomeIcon icon={faRotateLeft} />
                                undo
                            </button>
                        </>
                    }
                </div>
                { task && <TaskInfo taskData={task} planId={planId} />}
            </div>
            {
                showPopup && task &&
                <Popup closePopup={()=> handleToggle(false)}>
                    <TaskForm taskData={task} currentPlanId={planId} closePopup={()=> handleToggle(false)} action='edit'/>
                </Popup>
            }
        </>
    );
};

export default TaskCard;