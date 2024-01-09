import { UserDto } from "@/models/user/user.dto";
import UserService from "@/services/user/user.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./ViewUser.module.scss";

const User = () => {
    const router = useRouter();
    const userId = router.query.userId;
    const [user, setUser] = useState<UserDto | undefined>();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        if(typeof userId === "string"){
            UserService.getUser(userId)
            .then(res=>{
                setUser(res);
                setLoading(false);
            })
        }        
    }, [userId])

    const returnDateFormat = (dateString: string): string => {
        const date: Date = new Date(dateString);
        return date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString();
    }

    if(user === undefined || isLoading === true) return <>Loading...</>
    return <>
        <div className={styles.container}>
            <img src={user.picture} alt={user.firstName}></img>
            <div className={styles.infoContainer}>
                <h1>{" Full name: "}</h1>
                <h1>{user.title + " " + user.firstName + " " + user.lastName}</h1>
                <h2>{" Email: "}</h2>
                <h2>{user.email}</h2>
                <h2>{" Phone: "}</h2>
                <h2>{user.phone}</h2>
                <h2>{" Gender: "}</h2>
                <h2>{user.gender}</h2>
                <h2>{" Date of Birth: "}</h2>
                <h2>{returnDateFormat(user.dateOfBirth)}</h2>
                <h2>{" Address: "}</h2>
                <h2>{user.location.street}</h2>
                <h2>{" City: "}</h2>
                <h2>{user.location.city}</h2>
                <h2>{" State: "}</h2>
                <h2>{user.location.state}</h2>
                <h2>{" Country: "}</h2>
                <h2>{user.location.country}</h2>
                <h2>{" Register Date: "}</h2>
                <h2>{returnDateFormat(user.registerDate)}</h2>
                <h2>{" Last Update: "}</h2>
                <h2>{returnDateFormat(user.updatedDate)}</h2>
            </div>            
            <div className={styles.buttonWrap}>
                <button onClick={() => {router.push(`/user/edit/${user.id}`)}}>Edit User</button>
                <button onClick={() => {router.push(`/post/user/list/${user.id}`)}}>Show Posts</button>
            </div>
        </div>
        
        
    </>
}

export default User;