import { BaseDto, BaseListDto } from "../shared/sharedBase.dto";
import { UserItemDto } from "../user/user.dto";

export interface PostItemDto extends BaseDto{
    image: string;
    likes: number;
    owner: UserItemDto;
    publishDate: string;
    tags: string[];
    text: string;
}

export interface PostListDto extends BaseListDto{
    data: PostItemDto[];
}

export interface PostDto extends PostItemDto{
    link: string;
}