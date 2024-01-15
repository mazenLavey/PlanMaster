import { PlanType } from "@/types/interfaces";
import NewTaskBtn from "@/components/NewTaskBtn";
import ProgressBar from "@/components/ProgressBar";
import Popup from "@/components/Popup";
import PlanForm from "@/components/PlanForm";
import TaskSection from "@/components/TaskSection";
import { useToggle } from "@/hooks/useToggle";
import { format, differenceInDays } from "date-fns";
import { getBarWidthFromDate } from "@/functions/getBarWidthFromDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Tooltip from "@/components/Tooltip";
import Btn from "@/components/Btn";
import "./index.scss";

interface Props {
    currentPlanData: PlanType
}

const CurrentPlan: React.FC<Props> = ({currentPlanData}) => {
    const [showPopup, handleToggle] = useToggle();

    const creationDate = format(currentPlanData.timeStamp, 'yyyy-MM-dd');
    const days = differenceInDays(currentPlanData.deadline, creationDate);

    const barWidth = getBarWidthFromDate(creationDate, currentPlanData.deadline);

    const titleText = currentPlanData?.title ? currentPlanData.title: "new plan";

    return (
        <>
        <div className="CurrentPlan">
            <header className="CurrentPlan__Header">
                <h2 className="CurrentPlan__Title">{titleText}</h2>
                <NewTaskBtn currentPlanId={currentPlanData?.id}/>
            </header>

            <p className="CurrentPlan__Description">{currentPlanData?.description}</p>

            <div className="CurrentPlan__Limitation">
                {currentPlanData?.deadline ?
                    <>
                        <span className="CurrentPlan__Badge">
                            days: {days}
                        </span>
                        <span className="CurrentPlan__Badge CurrentPlan__Badge--Deadline">
                            dealline: {currentPlanData.deadline}
                        </span>
                    </>
                    :
                    <Tooltip tooltipText="Add deadline">
                        <Btn onClick={handleToggle}>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>deadline</span>
                        </Btn>
                    </Tooltip>
                }
            </div>

            <ProgressBar barWidth={barWidth} startColor="#3ed364" endColor="#ff746d"/>

            <div className="CurrentPlan__List">
                <TaskSection currentPlanData={currentPlanData} section="toDo"/>
                <TaskSection currentPlanData={currentPlanData} section="inProcess"/>
                <TaskSection currentPlanData={currentPlanData} section="done"/>
            </div>
        </div>

        {showPopup && 
            <Popup closePopup={() => handleToggle(false)}>
                <PlanForm data={currentPlanData} closePopup={() => handleToggle(false)}/>
            </Popup>
        }
        </>
    );
};

export default CurrentPlan;