import { PostListDto } from "@/models/post/post.dto";
import PostService from "@/services/post/post.service";
import { usePage } from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./UserPostList.module.scss";
import PostListComponent from "@/components/postListComponent/PostListComponent";
import PageButtonComponent from "@/components/pageButtons/PageButton";

const UserPostPage = () => {
    const router = useRouter();
    const userId = router.query.userId;
    const [postList, setPostList] = useState<undefined | PostListDto>();
    const {postPage} = usePage();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        if(typeof userId === "string"){
            PostService.getPostListByUser(postPage, userId)
                .then(res => {
                    setPostList(res);
                    setLoading(false);
                },
                error => {
                    setLoading(false);
                    toast.error(error.response.data.message ? error.response.data.message : error.message);
                });
        }
    }, [postPage])

    if(postList === undefined || isLoading === true) return <>Loading...</>
    return <div className={styles.main}>
        <div className={styles.topItemWrapper}>
            <button onClick={() => {router.push(`/post/create/${userId}`)}}>Create Post</button>
        </div> 
        <div className={styles.titleWrapper}>
            <h2>User Post List</h2>
        </div> 
        <PostListComponent data={postList.data} />
        <PageButtonComponent type={"postList"} totalPages={postList.total}/>
    </div>
}

export default UserPostPage;