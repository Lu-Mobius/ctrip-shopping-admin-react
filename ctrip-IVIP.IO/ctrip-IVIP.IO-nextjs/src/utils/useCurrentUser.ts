import { useEffect, useState } from "react";
import { UserType } from "@/type/user";
import { message } from "antd";
import Router, { useRouter } from "next/router";
// 获取当前登录用户的信息，如果没有用户信息，则重定向到登陆界面
export const useCurrentUser = () => {
    const router = useRouter();

    const userString = localStorage.getItem("user");
    if (userString) {
        const user = JSON.parse(userString);
        return user;
    } else {
        router.push("/login");
        message.error("请登录后重试");
        return
    }


};