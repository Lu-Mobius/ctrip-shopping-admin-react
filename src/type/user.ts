import { ValueOf } from "next/dist/shared/lib/constants";

import { USER_ROLE, USER_SEX, USER_STATUS } from "./../constants/index";

export interface UserType {
    nickName: string;
    _id?: string;
    name: string;
    role: USER_ROLE;
    status: USER_STATUS;
    sex: USER_SEX;
    money: string;

}

export interface UserLoginType {
    name: string;
    password: string;
}

export interface UserQueryType {
    current?: number;
    pageSize?: number;
    name?: string;
    all?: boolean;
    status?: USER_STATUS;
}

export interface UserFormProps {
    title: string;
    editData?: UserType;
}

export interface RegistrationFormValues {
    username: string;
    email: string;
    phone: string;
    password: string;
    confirm: string;
    role: string;
}

export interface UserListDataType {
    _id: string;
    name: string;
    email: string;
    phoneNumber: number;
    role: string;
    balance: number;
}
