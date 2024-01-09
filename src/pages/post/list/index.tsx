import { useEffect, useState } from "react";
import styles from "./PostList.module.scss"
import PageButtonComponent from "@/components/pageButtons/PageButton";
import { usePage } from "@/store";
import PostService from "@/services/post/post.service";
import { PostListDto } from "@/models/post/post.dto";
import { toast } from "react-toastify";
import PostListComponent from "@/components/postListComponent/PostListComponent";
import HomeButton from "@/components/homeButton/HomeButton";

const PostListPage = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [postList, setPostList] = useState<undefined | PostListDto>();
    const [searchValue, setSearchValue] = useState<string>("");
    const {postPage, setPostPage} = usePage();

    useEffect(() => {
        getData();
    }, [postPage])

    const getData = () => {
        setLoading(true);
        if(searchValue === ""){
            PostService.getPostList(postPage)
            .then(res => {
                setPostList(res);
                setLoading(false);
            },
            error => {
                setLoading(false);
                toast.error(error.response.data.message ? error.response.data.message : error.message);
            });
        }else{
            PostService.getPostListByTag(postPage, searchValue)
            .then(res => {
                setPostList(res);
                setLoading(false);
            },
            error => {
                setLoading(false);
                toast.error(error.response.data.message ? error.response.data.message : error.message);
            });
        }
        
    }


    if(postList === undefined || isLoading === true) return <>Loading...</>
    return <div className={styles.main}>
        <div className={styles.topItemWrapper}>
            <HomeButton />
        </div> 
        <div className={styles.titleWrapper}>
            <h2>User List</h2>
        </div> 
        <div className={styles.searchBar}>
            <input value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}/> 
            <button onClick={() => {setPostPage(0)}}>Search</button>
        </div>
        <PostListComponent data={postList.data} />
        <PageButtonComponent type={"postList"} totalPages={postList.total} />
    </div>

}

export default PostListPage;