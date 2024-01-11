import Plans from "@/components/Plans";
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = ()=>{
    return (
        <aside className={styles.wrapper}>
            <Plans />
        </aside>
    );
};

export default Sidebar;