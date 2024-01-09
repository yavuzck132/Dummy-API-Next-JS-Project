import { PostDto, PostListDto } from "@/models/post/post.dto";
import axios, { AxiosResponse } from "axios";

const API_URL = `https://dummyapi.io/data/v1`;
const API_ID = {"app-id": `6598a109af815d9444ae821b`};

const getPostList = (page: number): Promise<PostListDto> => {
    return axios.get<any, AxiosResponse<PostListDto>>(`${API_URL}/post`, { headers: API_ID, params: {limit: 10, page: page}})
    .then((response) => {
        return response.data;
    });
}

const getPostListByUser = (page: number, userId: string) => {
    return axios.get<any, AxiosResponse<PostListDto>>(`${API_URL}/user/${userId}/post`, { headers: API_ID, params: {limit: 10, page: page}})
    .then((response) => {
        return response.data;
    });
}

const getPostListByTag = (page: number, tagId: string) => {
    return axios.get<any, AxiosResponse<PostListDto>>(`${API_URL}/tag/${tagId}/post`, { headers: API_ID, params: {limit: 10, page: page}})
    .then((response) => {
        return response.data;
    });
}

const getPost = (id: string): Promise<PostDto> => {
    return axios.get<any, AxiosResponse<PostDto>>(`${API_URL}/post/${id}`, { headers: API_ID })
    .then((response) => {
        return response.data;
    });
}

const createPost = (postData: PostDto): Promise<PostDto> => {
    return axios
        .post<PostDto, AxiosResponse<PostDto>>(`${API_URL}/post/create`, {...postData, owner: postData.owner.id} , { headers: API_ID })
        .then((response) => {
            return response.data;
        });
}

const updatePost = (postData: PostDto, id: string): Promise<PostDto> => {
    return axios
        .put<PostDto, AxiosResponse<PostDto>>(`${API_URL}/post/${id}`, postData, { headers: API_ID })
        .then((response) => {
            return response.data;
        });
}

const deletePost = (id: string) => {
    return axios
        .delete<string, AxiosResponse<string>>(`${API_URL}/post/${id}`, { headers: API_ID })
        .then((response) => {
            return response.data;
        });
}

const PostService = {
    getPostList,
    getPostListByUser,
    getPostListByTag,
    getPost,
    createPost,
    updatePost,
    deletePost
};

export default PostService;