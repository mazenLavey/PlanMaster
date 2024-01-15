"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import "./index.scss";

const Logo: React.FC = ()=>{
    const router = useRouter();

    const handleClick = (): void => {
        router.push('/');
    }

    return (
        <div className="Logo" onClick={handleClick}>
            <Image className="Logo__Img" src='/assets/logo.png' alt='logo' width={40} height={40}/>
        </div>
    );
};

export default Logo