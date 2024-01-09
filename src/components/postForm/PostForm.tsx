import { PostDto } from "@/models/post/post.dto";
import PostService from "@/services/post/post.service";
import UserService from "@/services/user/user.service";
import { FunctionComponent, useEffect, useState, MouseEvent, FormEvent } from "react"
import { toast } from "react-toastify";
import styles from "./PostForm.module.scss";

interface PostProps {
    id: string,
    type: "postId" | "userId"
}

const PostForm: FunctionComponent<PostProps> = (props) => {
    const [emptyValue, setEmptyValue] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [postData, setPostData] = useState<PostDto>({
        image: "",
        likes: 0,
        owner: {
            id: "",
            firstName: "",
            lastName: "",
            title: "",
            picture: ""
        },
        publishDate: "",
        tags: [],
        text: "",
        link: ""
    })

    useEffect(() => {
        if(props.type === "postId"){
            PostService.getPost(props.id)
            .then(res=>{
                setPostData(res);
                setLoading(false);
            })
        }else{
            UserService.getUser(props.id)
            .then(res=>{
                setPostData({...postData, owner: {
                    id: res.id,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    title: res.title,
                    picture: res.picture
                }});
                setLoading(false);
            })
        }
        setLoading(false);
    }, [])

    const changeValue = (name: string, value: string) => {
        setPostData({
            ...postData,
            [name]: name === "likes" ? +value : value
        });
    }

    const addTag = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newTags = postData.tags;
        newTags.push("");
        setPostData({
            ...postData,
            tags: newTags
        });
    }

    const updateTag = (index: number, value: string) => {
        const newTags = postData.tags;
        newTags[index] = value;
        setPostData({
            ...postData,
            tags: newTags
        });
    }
    
    const removeTag = (index: number) => {
        const newTags = postData.tags;
        newTags.splice(index, 1);
        setPostData({
            ...postData,
            tags: newTags
        });
    }

    const loadImage = async (): Promise<boolean> => {
        const img = new Image();
        img.src = postData.image ? postData.image : "";
        return new Promise((resolve, reject) => {
            img.onload = () => {
              resolve(true); // Image loaded successfully
            };
            img.onerror = () => {
              reject(new Error('Image failed to load'));
            };
        });
    }

    const clearEmptyTags = (): PostDto => {
        let newPostData: PostDto = postData;
        newPostData.tags.forEach((tag, index) => {
            if(tag.trim() === ""){
                newPostData.tags.splice(index, 1);
            }
        })
        return newPostData;
    }

    const uploadData = (newPostData: PostDto) => {
        if(props.type === "userId"){
            PostService.createPost({...newPostData, publishDate: (new Date()).toISOString()}).then(() => {
                setLoading(false);
                toast.success("Post created successefully!");
                window.history.go(-1)
            },
            error => {
                setLoading(false);
                toast.error(error.response.data.message ? error.response.data.message : error.message);
            });
        }else{
            PostService.updatePost(newPostData, props.id).then(() => {
                setLoading(false);
                toast.success("Post updated successefully!");
            },
            error => {
                setLoading(false);
                toast.error(error.response.data.message ? error.response.data.message : error.message);
            });
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        for (let postDataKey of Object.keys(postData)){
            if(postDataKey !== "owner" && postDataKey !== "tags" && postDataKey !== "publishDate"){
                if(postData[postDataKey as keyof PostDto] === ""){
                    setEmptyValue(true);
                    setLoading(false);
                    return;
                }
            }
        }
        setEmptyValue(false);
        loadImage().then(() => {
            // Code to execute when the image is loaded successfully
            setImageError(false);
            uploadData(clearEmptyTags());
        },
        error => {
            // Code to execute when there's an error loading the image
            setImageError(true);
            setLoading(false);
            toast.error(error.message);
        });
                
    };

    const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(props.type === "postId"){   
            PostService.deletePost(props.id).then(
                () => {
                    setLoading(false);
                    toast.success("Post was successefully removed!");
                    window.history.go(-2)
                },
                error => {
                    setLoading(false);
                    toast.error(error.response.data.message ? error.response.data.message : error.message);
                });
        }
    }

    if(isLoading === true) return <>Loading...</>
    return <>
        <div className={styles.formWrap}>
            <h1>{props.type === "postId" ? `Edit Post` : `Create Post`}</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                {emptyValue ? <p className={styles.errorMessage}>Please fill all the values.</p> : <></>}
                {imageError ? <p className={styles.errorMessage}>Cannot find provided image text. Please type in online image link.</p> : <></>}                
                <div className={styles.formGroup}>
                    <label>Image</label>
                    <input value={postData.image} onChange={(e)=>{changeValue("image", e.target.value)}}/> 
                </div>                
                <div className={styles.formGroup}>
                    <label>Likes</label>
                    <input type="number" value={postData.likes.toString()} onChange={(e)=>{changeValue("likes", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Link</label>
                    <input type="url" value={postData.link} onChange={(e)=>{changeValue("link", e.target.value)}}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Text</label>
                    <textarea value={postData.text} onChange={(e)=>{changeValue("text", e.target.value)}} minLength={6} maxLength={50}/> 
                </div>
                <div className={styles.formGroup}>
                    <label>Tags</label>
                    <div className={styles.tagWrap}>
                        {postData.tags.map((tag, index) => {
                            return <div className={styles.tagItemWrap}>
                                <input value={tag} onChange={(e) => {updateTag(index, e.target.value)}}/>
                                <span onClick={()=>removeTag(index)}>X</span>
                            </div>
                        })}
                    </div>                    
                </div>
                <div className={styles.tabButtonWrap}>
                    <button onClick={(e) => {addTag(e)}}>Add Tag</button>
                </div>  
                <div className={styles.buttonWrap}>
                    <button type="submit" className={styles.submitButton}>{props.type === "postId" ? `Update` : `Create`}</button>
                    {props.type === "postId" ? <button onClick={(e) => onDelete(e)} className={styles.deleteButton}>Delete</button> : <></>}                    
                </div>
            </form>
        </div>
    </>
}

export default PostForm;