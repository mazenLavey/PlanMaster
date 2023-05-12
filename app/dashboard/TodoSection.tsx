import TaskCard from '@/components/cards/TaskCard';
import styles from '@/styles/Tasks.module.scss';
import { nanoid } from "nanoid";
import { TasksSectionProps } from '@/types/interfaces';

const TodoSection: React.FC<TasksSectionProps> = ({currentTaskData, planId})=>{
    return (
        <section>
            <h3>To Do</h3>
            <div className={styles.tasks}>
                {currentTaskData?.map(el => <TaskCard key={nanoid()} taskData={el} planId={planId}/>)}
            </div>
        </section>
    );
};

export default TodoSection;