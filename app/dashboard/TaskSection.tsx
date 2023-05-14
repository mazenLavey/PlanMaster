import TaskCard from '@/components/cards/TaskCard';
import styles from '@/styles/Tasks.module.scss';
import { nanoid } from "nanoid";
import { PlanType, TaskStage } from '@/types/interfaces';

interface Props {
    currentPlanData: PlanType,
    section: TaskStage
}

const TaskSection: React.FC<Props> = ({currentPlanData, section})=>{
    return (
        <section>
            <h3>{section === "toDo" ? "To Do": section === "inProcess"? "In Process" : "Done"}</h3>
            <div className={styles.tasks}>
            {currentPlanData?.tasks.map(el => {
                if(el.stage === section) {
                    return <TaskCard key={nanoid()} taskData={el} planId={currentPlanData.id}/>
                }})
            }
            </div>
        </section>
    );
};

export default TaskSection;