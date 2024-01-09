import { UserListDto, UserDto } from "@/models/user/user.dto";
import axios, { AxiosResponse } from "axios";

const API_URL = `https://dummyapi.io/data/v1/user`;
const API_ID = {"app-id": `6598a109af815d9444ae821b`};

const getUserList = (page: number): Promise<UserListDto> => {
    return axios.get<any, AxiosResponse<UserListDto>>(API_URL, { headers: API_ID, params: {limit: 12, page: page}})
    .then((response) => {
        return response.data;
    });
}

const getUser = (id: string): Promise<UserDto> => {
    return axios.get<any, AxiosResponse<UserDto>>(`${API_URL}/${id}`, { headers: API_ID })
    .then((response) => {
        return response.data;
    });
}

const createUser = (userData: UserDto): Promise<UserDto> => {
    return axios
        .post<UserDto, AxiosResponse<UserDto>>(`${API_URL}/create`, userData, { headers: API_ID })
        .then((response) => {
            return response.data;
        });
}

const updateUser = (userData: UserDto, id: string): Promise<UserDto> => {
    return axios
        .put<UserDto, AxiosResponse<UserDto>>(`${API_URL}/${id}`, userData, { headers: API_ID })
        .then((response) => {
            return response.data;
        });
}

const deleteUser = (id: string) => {
    return axios
        .delete<string, AxiosResponse<string>>(`${API_URL}/${id}`, { headers: API_ID })
        .then((response) => {
            return response.data;
        });
}

const UserService = {
    getUserList,
    getUser,
    createUser,
    updateUser,
    deleteUser
};

export default UserService;