import Popup from "@/components/Popup";
import TaskForm from "@/components/TaskForm";
import Btn from "@/components/Btn";
import { useToggle } from "@/hooks/useToggle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
    currentPlanId: string
}

const NewTaskBtn: React.FC<Props>= ({currentPlanId})=>{
    const [showPopup, handleToggle] = useToggle();

    return (
        <>
            <Btn onClick={handleToggle}>
                <FontAwesomeIcon icon={faPlus} width={15}/>
                <span>task</span>
            </Btn>

            {showPopup && 
                <Popup closePopup={() => handleToggle(false)}>
                    <TaskForm currentPlanId={currentPlanId} closePopup={() => handleToggle(false)} action="new"/>
                </Popup>
            }
        </>
    );
};

export default NewTaskBtn;