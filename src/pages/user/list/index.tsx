import { UserListDto } from "@/models/user/user.dto";
import UserService from "@/services/user/user.service";
import { useEffect, useState } from "react";
import styles from "./UserList.module.scss"
import PageButtonComponent from "@/components/pageButtons/PageButton";
import { usePage } from "@/store";
import { useRouter } from 'next/router';
import HomeButton from "@/components/homeButton/HomeButton";

const UserListPage = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [userList, setUserList] = useState<undefined | UserListDto>();
    const {userPage} = usePage();
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        UserService.getUserList(userPage)
        .then(res => {
            setUserList(res);
            setLoading(false);
        }
        );
    }, [userPage])


    if(userList === undefined || isLoading === true) return <>Loading...</>
    return <div className={styles.main}>
        <div className={styles.topItemWrapper}>
            <HomeButton />
            <button onClick={() => {router.push(`/user/create`)}}>Create User</button>
        </div> 
        <div className={styles.titleWrapper}>
            <h2>User List</h2>
        </div>          
        <div className={styles.cardWrapper}>
            {userList.data.map(user => {
                return <div key={user.id} className={styles.userCard} onClick={() => {router.push(`/user/view/${user.id}`)}}>
                        <div className={styles.cardContent}>
                            <img src={user.picture}></img>
                            <h3>{user.title + " " + user.firstName + " " + user.lastName}</h3>
                        </div>
                    </div>
            })}
        </div>        
        <PageButtonComponent totalPages={userList.total} type={"userList"}/>
    </div>

}

export default UserListPage;