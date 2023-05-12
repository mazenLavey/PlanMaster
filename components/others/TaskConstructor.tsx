import { TaskType } from "@/types/interfaces";
import TaskForm from "../forms/TaskForm";
import TaskInfo from "../forms/TaskInfo";
import { useToggle } from "@/hooks/useToggle";

interface Props {
    taskData: TaskType,
    planId: string
}

const TaskConstructor: React.FC<Props> = ({taskData, planId}) => {
    const [isEdit, handleToggle] = useToggle();

    function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
        e.stopPropagation();
        handleToggle();
    };

    return (
        <div>
            <div>
                {
                    isEdit?
                    <TaskForm taskData={taskData} currentPlanId={planId} action="edit" />
                    :
                    <TaskInfo taskData={taskData} planId={planId}/>
                }
            </div>
                <button onClick={handleClick}>{isEdit? "don't save" : "edit"}</button>
        </div>
    );
};

export default TaskConstructor;