import request from "@/utils/request";

export const setLogout = async () => {
    await request.get(`/api/logout`);
};
