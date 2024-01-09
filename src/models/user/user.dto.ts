import { BaseDto, BaseListDto } from "../shared/sharedBase.dto";

export interface UserItemDto extends BaseDto{
    firstName: string;
    lastName: string;
    picture?: string;
    title?: string;
}

export interface UserListDto extends BaseListDto{
    data: UserItemDto[];
}

export interface UserDto extends UserItemDto{
    dateOfBirth: string,
    email: string,
    gender: string,
    location: {
        city: string,
        country: string,
        state: string,
        street: string,
        timezone: string
    },
    phone: string,
    registerDate: string,
    updatedDate: string
}