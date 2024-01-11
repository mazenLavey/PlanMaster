import styles from "./EmptyDashboard.module.scss";
import Image from "next/image";

const EmptyDashboard: React.FC = ()=>{
    
    return (
        <div className={styles.empty}>
            <div className={styles.box}>
                No Plans
            </div>
            <div className={styles.imgContainer}>
                <Image src="/assets/no_plans.webp" alt="task management" fill={true} placeholder="empty" priority={true}/>
            </div>
        </div>
    );
};

export default EmptyDashboard;