"use client";

import { useContext, useState } from 'react';
import { PlansContext } from '@/contexts/PlansContext';
import { useToggle } from '@/hooks/useToggle';
import { TaskType, OperationType, TaskStage } from '@/types/interfaces';
import styles from '@/styles/TaskCard.module.scss';
import Popup from '../others/Popup';
import TaskInfo from '../forms/TaskInfo';
import TaskForm from '../forms/TaskForm';

interface Props {
    taskData: TaskType,
    planId: string,
}

const TaskCard: React.FC<Props> = ({taskData, planId})=>{
    const {updataTask, deleteTask} = useContext(PlansContext);
    const [showPopup, handleToggle] = useToggle();
    const [task] = useState<TaskType>(taskData);

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
                const checkAllDone = task.subTasks.every(subtask => subtask.status === true);
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
            <div className={styles.wrapper} >
                <div className={styles.top} style={{display: "flex", justifyContent: "space-between"}}>
                    <TaskInfo taskData={task} planId={planId} />
                    <div className={styles.buttons}>
                        {task?.stage === "toDo"?
                            <>
                                <button onClick={()=> handleToggle()}>edit</button>
                                <button data-type='start' onClick={handleClick}>start</button>
                                <button data-type='delete' onClick={handleClick}>X</button>
                            </>
                        :task?.stage === "inProcess"?
                            <>
                                <button onClick={()=> handleToggle()}>edit</button>
                                <button data-type='done' onClick={handleClick}>check</button>
                                <button data-type='stop' onClick={handleClick}>c=</button>
                            </>
                        :
                            <>
                                <div>done</div>
                                <button data-type='undo' onClick={handleClick}>C=</button>
                            </>
                        }
                    </div>
                </div>
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