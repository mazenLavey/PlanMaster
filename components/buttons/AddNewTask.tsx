import Popup from "@/components/others/Popup";
import TaskForm from "@/components/forms/TaskForm";
import { useToggle } from "@/hooks/useToggle";

interface Props {
    currentPlanId: string
}

const AddNewTask: React.FC<Props>= ({currentPlanId})=>{
    const [showPopup, handleToggle] = useToggle();

    function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
        e.stopPropagation();
        handleToggle();
    }
    return (
        <>
        <button onClick={handleClick}>Add New Task</button>
        {showPopup && 
            <Popup closePopup={() => handleToggle(false)}>
                <TaskForm currentPlanId={currentPlanId} closePopup={() => handleToggle(false)} action="new"/>
            </Popup>
        }
        
        </>
    );
};

export default AddNewTask;