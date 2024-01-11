import Logo from "../Logo";
import styles from "./Nav.module.scss";
import '@/styles/globals.scss';

const Nav: React.FC = ()=>{
    return (
        <header className={styles.navbar}>
            <div className={` ${styles.wrapper} container`}>
                <Logo />
                <nav>
                    <div></div>
                </nav>
            </div>
        </header>
    );
};

export default Nav;