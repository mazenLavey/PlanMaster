import Plans from "@/components/others/Plans";
import styles from "@/styles/Sidebar.module.scss";

const Sidebar: React.FC = ()=>{
    return (
        <aside className={styles.wrapper}>
            <Plans />
        </aside>
    );
};

export default Sidebar;