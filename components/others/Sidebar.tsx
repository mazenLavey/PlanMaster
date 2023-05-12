import AddNewPlan from "@/components/buttons/AddNewPlan";
import Logo from "@/components/others/Logo";
import Plans from "@/components/others/Plans";
import styles from "@/styles/Sidebar.module.scss";

const Sidebar: React.FC = ()=>{
    return (
        <aside className={styles.wrapper}>
            <Logo />
            <Plans />
            <AddNewPlan />
        </aside>
    );
};

export default Sidebar;