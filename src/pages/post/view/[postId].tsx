import { PostDto } from "@/models/post/post.dto";
import PostService from "@/services/post/post.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./ViewPost.module.scss";

const Post = () => {
    const router = useRouter();
    const postId = router.query.postId;
    const [isLoading, setLoading] = useState<boolean>(true);
    const [post, setPost] = useState<PostDto>();

    useEffect(() => {
        setLoading(true);
        if(typeof postId=== "string"){
            PostService.getPost(postId)
            .then(res=>{
                setPost(res);
                setLoading(false);
            })
        }        
    }, [postId])

    const returnDateFormat = (dateString: string): string => {
        const date: Date = new Date(dateString);
        return date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString();
    }

    if(post === undefined || isLoading === true) return <>Loading...</>
    return <>
        <div className={styles.container}>
            <img src={post.image} alt={post.image}></img>
            <div className={styles.infoContainer}>
                <h1>{" Created By: "}</h1>
                <h1>{post.owner.title + " " + post.owner.firstName + " " + post.owner.lastName}</h1>
                <h2>{" Likes: "}</h2>
                <h2>{post.likes}</h2>
                <h2>{" Publis Date: "}</h2>
                <h2>{returnDateFormat(post.publishDate)}</h2>
                <h2>{" Link: "}</h2>
                <h2>{post.link}</h2>
                <h2>{" Tags: "}</h2>
                <div>
                {post.tags.map(tag => {
                    return <span>{tag}</span>
                })} 
                </div>     
                <h2>{" Text: "}</h2>              
                <p>{post.text}</p>
            </div>
            <div className={styles.buttonWrap}>
                <button onClick={() => {router.push(`/post/edit/${postId}`)}}>Edit Post</button>
            </div>
        </div>
    </>
}

export default Post;