
import styles from "@/styles/Footer.module.scss";

const Footer: React.FC = ()=>{
    return (
        <footer className={`${styles.wrapper} container`}>
                <p>Made by <span>Mazen Lavey</span></p>
        </footer>
    );
};

export default Footer;