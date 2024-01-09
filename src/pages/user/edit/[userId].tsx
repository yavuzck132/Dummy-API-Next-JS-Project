import UserForm from "@/components/userForm/UserForm";
import { useRouter } from "next/router";


const EditUser = () => {
    const router = useRouter();
    const userId = router.query.userId;
    
    if(typeof userId === "string") return <UserForm userId={userId}/>
    return <>Loading...</>
}

export default EditUser;