
import { UserType } from "@/type/user";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";

export const useCurrentUser = () => {
    const router = useRouter()
    const [user, setUser] = useState<UserType | null>(null);
    useEffect(() => {
        const obj = localStorage.getItem("user");
        if (obj !== null) {
            setUser(JSON.parse(obj));
        }

    }, [router]);
    return user;
};