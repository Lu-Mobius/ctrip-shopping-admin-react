import { useEffect, useState } from "react";
import { UserType } from "@/type/user";
import { message } from "antd";
import Router, { useRouter } from "next/router";

export const useCurrentUser = (): UserType | null => {
    const router = useRouter();
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            setUser(user);
        } else {
            router.push("/login");
            message.error("请登录后重试");
        }
    }, [router]);

    return user;
};