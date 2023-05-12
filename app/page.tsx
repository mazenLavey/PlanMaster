import styles from './../styles/Home.module.scss';
import Link from 'next/link';

const Home:React.FC = () => {
  return (
    <main>
      <header className={styles.header}>
        <h1 className={styles.text}>Plans Board</h1>
        <p className={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium accusantium fugit reiciendis fuga deleniti quae officia qui. Expedita, corporis sint.</p>
      </header>
      <Link href={"/dashboard"}>go to Dashboard</Link>
    </main>
  )
}

export default Home;