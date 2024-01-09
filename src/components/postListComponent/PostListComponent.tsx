import { PostItemDto } from "@/models/post/post.dto";
import { FunctionComponent } from "react";
import styles from "./PostListComponent.module.scss";
import { useRouter } from "next/router";

interface PostListProps {
    data: PostItemDto[]
}

const PostListComponent: FunctionComponent<PostListProps> = (props) => {
    const router = useRouter();
    return <>
        <div className={styles.postCardWrap}>
            {props.data.map(post => {
                return <div key={post.id} className={styles.postCard} onClick={()=>{router.push(`/post/view/${post.id}`)}}>
                            <div className={styles.userContent}>
                                <img src={post.owner.picture}/>
                                <h4>{post.owner.title + " " + post.owner.firstName + " " + post.owner.lastName}</h4>
                            </div>
                            <div className={styles.postContent}>
                                <div className={styles.postContentItem}>
                                    <img src={post.image}/>
                                </div>                             
                                <div className={styles.postContentItem}>
                                    <h6>{(new Date(post.publishDate)).toString().slice().substring(0, 24)}</h6>
                                    <h4>{post.text}</h4>
                                    <div className={styles.tagWrapper}>
                                        {post.tags.map((tag, index) => {
                                            return <span key={index}>{tag}</span>
                                        })}
                                    </div>
                                    <h5>{`Likes: ` + post.likes.toString()}</h5>
                                </div>
                        </div>
                    </div>
            })}
        </div>
    </>
}

export default PostListComponent;