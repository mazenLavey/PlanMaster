import Popup from "@/components/others/Popup";    
import PlanForm from "@/components/forms/PlanForm";
import { PlanType } from "@/types/interfaces";
import { useToggle } from "@/hooks/useToggle";

interface Props {
    data: PlanType,
    showPlan: (data: PlanType) => void,
    deletePlan: ()=> void
}

const PlanCard: React.FC<Props> = ({data, showPlan, deletePlan}) => {
    const [showPopup, handleToggle] = useToggle();

    return (
        <div>
            <div onClick={() => showPlan(data)}>{data.title}</div>
            <button onClick={()=> handleToggle()}>edit</button>
            <button onClick={deletePlan}>delete</button>
            
            {showPopup && 
            <Popup closePopup={() => handleToggle(false)}>
                <PlanForm data={data} closePopup={() => handleToggle(false)}/>
            </Popup>
            }
        </div>
    );
};

export default PlanCard;