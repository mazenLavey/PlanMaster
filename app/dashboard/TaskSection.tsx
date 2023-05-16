import TaskCard from '@/components/cards/TaskCard';
import styles from '@/styles/TaskSection.module.scss';
import { nanoid } from "nanoid";
import { PlanType, TaskStage } from '@/types/interfaces';

interface Props {
    currentPlanData: PlanType,
    section: TaskStage
}

const TaskSection: React.FC<Props> = ({currentPlanData, section})=>{
    const taskSum = currentPlanData.tasks.filter(task => task.stage === section).length;

    return (
        <section className={styles.wrapper}>
            <div className={styles.title}>
                <h3 className={styles.text}>{section === "toDo" ? `To Do`: section === "inProcess"? `In Process` : `Done`}</h3>
                <span className={`${styles.circle} ${section === "toDo" ? "": section === "inProcess"? styles.inProcess : styles.done}` }>{taskSum > 0? taskSum : 0}</span>
            </div>
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