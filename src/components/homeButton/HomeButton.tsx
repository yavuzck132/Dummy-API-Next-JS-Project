import { usePage } from "@/store";
import { useRouter } from 'next/router';
import styles from "./HumeButton.module.scss";

const HomeButton = () => {
    const {setUserPage, setPostPage} = usePage();    
    const router = useRouter();

    return <div onClick={() => {setUserPage(0); setPostPage(0); router.push(`/`)}} className={styles.homeButton}>
        <h1>{`<= Main Page`}</h1>
    </div>  
}

export default HomeButton;