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
            <Image src="/assets/logo.png" alt='logo' fill={true}  />
        </div>
    );
};

export default Logo