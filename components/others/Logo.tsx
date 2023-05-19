"use client";

import { useRouter } from 'next/navigation';
import styles from "@/styles/Logo.module.scss";
import Image from 'next/image';

const Logo: React.FC = ()=>{
    const router = useRouter();

    function handleClick(): void {
        router.push('/');
    }

    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <img src='/assets/logo04.png' alt='logo' width={40} height={40}/>
            {/* <p>Plan Master</p> */}
        </div>
    );
};

export default Logo