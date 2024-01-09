import styles from '@/styles/Main.module.scss'
import { useRouter } from 'next/router';

//Change background color
export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <h1>DUMMY API NEXT.JS PROJECT</h1>
        
      <div className={styles.cardWrapper}>
        <div onClick={() => {router.push('/user/list')}} className={styles.card}>
          Users
        </div>
        <div onClick={() => {router.push('/post/list')}} className={styles.card}>
          Posts
        </div>
      </div>      
    </div>
  )
}
