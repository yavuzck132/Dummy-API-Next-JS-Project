import PostForm from "@/components/postForm/PostForm";
import { useRouter } from "next/router";


const CreatePost = () => {
    const router = useRouter();
    const userId = router.query.userId;
    
    if(!userId || typeof userId !== "string") return <div>Error on getting userId...</div>
    return <PostForm id={userId} type={"userId"}/>
}

export default CreatePost;