"use client"

import styles from '@/styles/Home.module.scss';
import stylesBtn from "@/styles/Buttons.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import routes from '@/routes';
import { useContext } from 'react';
import { PlansContext } from '@/contexts/PlansContext';

const Home:React.FC = () => {
  const {isNewUser} = useContext(PlansContext);

  return (
    <main className={styles.hero}>
      <header className={styles.text}>
        <h1>Achieve more with <br /><span className={styles.brand}>Plan Master</span></h1>
        <Link href={routes.dashboard} className={stylesBtn.button}>{isNewUser? "Start Free Now" : "to Dashboard"}</Link>
      </header>
      <div className={styles.imgContainer}>
        <Image src="/assets/planmaster_hero_img.png" alt="task management" fill={true} placeholder='empty' priority={true}/>
      </div>
    </main>
  )
}

export default Home;