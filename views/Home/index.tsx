"use client"

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import routes from '@/routes';
import Btn from '@/components/Btn';
import './index.scss';

const Home:React.FC = () => {
    const router = useRouter()

    const handleClick = () => {
        router.push(routes.dashboard);
    }

    return (
        <div className="Home">
            <header className="Home__Header">
                <div className="Home__TitleWrapper">
                    <h1 className="Home__Title">Achieve more with</h1>
                    <h1 className="Home__Title Home__Title--Orange">Plan Master</h1>
                </div>
                <Btn onClick={handleClick}>
                    to Dashboard
                </Btn>
            </header>
            <div className="Home__ImgContainer">
                <Image src="/assets/planmaster_hero_img.png" alt="task management" fill={true} placeholder='empty' priority={true}/>
            </div>
        </div>
    )
}

export default Home;