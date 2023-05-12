"use client";

import { PlansContext } from '@/contexts/PlansContext';
import styles from '@/styles/TaskCard.module.scss';
import { TaskType } from '@/types/interfaces';
import { useContext } from 'react';
import Popup from '../others/Popup';
import TaskConstructor from '../others/TaskConstructor';
import { useToggle } from '@/hooks/useToggle';

interface Props {
    taskData: TaskType,
    planId: string
}

const TaskCard: React.FC<Props> = ({taskData, planId})=>{
    const {changeTaskStatus, deleteTask} = useContext(PlansContext);
    const [showPopup, handleToggle] = useToggle();

    function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
        e.stopPropagation();
        const target = e.currentTarget;
        const actionType: string | undefined = target.dataset.type;

        if(actionType === "delete") {
            deleteTask(planId, taskData.id, taskData.status);
        } else if (actionType === "next") {
            changeTaskStatus(planId, taskData.id, taskData.status, "next");
        } else if(actionType === "back") {
            changeTaskStatus(planId, taskData.id, taskData.status, "back");
        } else if(actionType === "done") {
            changeTaskStatus(planId, taskData.id, taskData.status, "done");
        } else if (actionType === "undo") {
            changeTaskStatus(planId, taskData.id, taskData.status, "undo");
        }
    };

    return (
        <>
            <div className={styles.wrapper} onClick={()=> handleToggle()}>
                <div>
                    <h4>{taskData?.title}</h4>
                    <p>{taskData?.taskDescription}</p>
                </div>
                {taskData.status === "toDo"?
                    <div className={styles.buttons}>
                        <button data-type='next' onClick={handleClick}>start</button>
                        <button data-type='delete' onClick={handleClick}>X</button>
                    </div>
                :taskData.status === "inProcess"?
                    <div>
                        <button data-type='done' onClick={handleClick}>check</button>
                        <button data-type='back' onClick={handleClick}>2=</button>
                    </div>
                :
                    <div>
                        <div>done</div>
                        <button data-type='undo' onClick={handleClick}>2=</button>
                    </div>
                }
            </div>
            {
                showPopup &&
                <Popup closePopup={()=> handleToggle(false)}>
                    <TaskConstructor taskData={taskData} planId={planId}/>
                </Popup>
            }
        </>
    );
};

export default TaskCard;