import Popup from "@/components/others/Popup";
import TaskForm from "@/components/forms/TaskForm";
import { useToggle } from "@/hooks/useToggle";
import styles from "@/styles/Buttons.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
        <button onClick={handleClick} className={styles.button}>
            <FontAwesomeIcon icon={faPlus} width={15}/>
            task
        </button>
        {showPopup && 
            <Popup closePopup={() => handleToggle(false)}>
                <TaskForm currentPlanId={currentPlanId} closePopup={() => handleToggle(false)} action="new"/>
            </Popup>
        }
        
        </>
    );
};

export default AddNewTask;