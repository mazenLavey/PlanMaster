import styles from './../styles/Home.module.scss';
import Link from 'next/link';
import stylesBtn from "@/styles/Buttons.module.scss";
import Image from 'next/image';

const Home:React.FC = () => {
  return (
    <main className={styles.hero}>
      <header className={styles.text}>
        <h1>Achieve more with <br /><span className={styles.brand}>Plan Master</span></h1>
        <Link href={"/dashboard"} className={stylesBtn.button}>Start Free Now</Link>
      </header>
      <div className={styles.imgContainer}>
        <Image src="/assets/planmaster_hero_img.png" alt="task management" fill={true}/>
      </div>
    </main>
  )
}

export default Home;