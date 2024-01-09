import PostForm from "@/components/postForm/PostForm";
import { useRouter } from "next/router";


const EditPost = () => {
    const router = useRouter();
    const postId = router.query.postId;
    
    if(!postId || typeof postId !== "string") return <div>Error on getting postId...</div>
    return <PostForm id={postId} type={"postId"}/>
}

export default EditPost;