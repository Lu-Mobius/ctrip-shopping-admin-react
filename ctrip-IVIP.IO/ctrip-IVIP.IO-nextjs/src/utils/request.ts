// export const baseUrl = location.protocol + '//localhost';

// 定义 FetchInstanceType 类型，表示 Fetch 请求的实例类型，返回 Promise 类型，泛型 T 表示返回数据的类型
interface FetchInstanceType {
    get<T = any>(url: string, init?: RequestInit): Promise<T>;
    delete<T = any>(url: string, init?: RequestInit): Promise<T>;
    head<T = any>(url: string, init?: RequestInit): Promise<T>;
    options<T = any>(url: string, init?: RequestInit): Promise<T>;
    post<T = any>(url: string, data?: any, init?: RequestInit): Promise<T>;
    put<T = any>(url: string, data?: any, init?: RequestInit): Promise<T>;
    patch<T = any>(url: string, data?: any, init?: RequestInit): Promise<T>;
}

// 定义 CreateFetchInstance 函数，返回 FetchInstanceType 类型的实例对象
// 该函数接受两个参数，baseUrl 表示请求的基础URL，headers 表示请求头信息

export const CreateFetchInstance = (
    baseUrl: string,
    headers?: Record<string, string>
): FetchInstanceType => {
    // 定义 getHeaders 函数，返回 headers 对象，包括用户信息的 userToken 字段（因为SSR无法读取本地数据，所以就没有在请求头中加入用户的token了）
    const getHeaders = () => {
        // const user = JSON.parse(localStorage.getItem("user") || "{}");
        return {
            ...headers,
            // userToken: user?._id,
        };
    };

    // 定义 FetchInstanceType 实例对象，包含各种请求方法的实现
    const instance: FetchInstanceType = {
        async get(url: string, init?: RequestInit) {
            const response = await fetch(`${baseUrl}${url}`, {
                method: "GET",
                headers: getHeaders(),
                ...init,
            });
            return response.json();
        },
        async delete(url: string, init?: RequestInit) {
            const response = await fetch(`${baseUrl}${url}`, {
                method: "DELETE",
                headers: getHeaders(),
                ...init,
            });
            return response.json();
        },
        async head(url: string, init?: RequestInit) {
            const response = await fetch(`${baseUrl}${url}`, {
                method: "HEAD",
                headers: getHeaders(),
                ...init,
            });
            return response.json();
        },
        async options(url: string, init?: RequestInit) {
            const response = await fetch(`${baseUrl}${url}`, {
                method: "OPTIONS",
                headers: getHeaders(),
                ...init,
            });
            return response.json();
        },
        async post(url: string, data?: any, init?: RequestInit) {
            const response = await fetch(`${baseUrl}${url}`, {
                method: "POST",
                headers: {
                    ...getHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                ...init,
            });
            return response.json();
        },
        async put(url: string, data?: any, init?: RequestInit) {
            const response = await fetch(`${baseUrl}${url}`, {
                method: "PUT",
                headers: {
                    ...getHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                ...init,
            });
            return response.json();
        },
        async patch(url: string, data?: any, init?: RequestInit) {
            const response = await fetch(`${baseUrl}${url}`, {
                method: "PATCH",
                headers: {
                    ...getHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                ...init,
            });
            return response.json();
        },
    };

    return instance;
};

// 环境判断，服务器环境则添加服务器URL的前缀（服务器端渲染时，不能根据next.config.js里的内容进行url的重定向）
let request = CreateFetchInstance("");

if (typeof window === "undefined") {
    const newBaseUrl = 'http://localhost:3000';;
    request = CreateFetchInstance(newBaseUrl);
}

export default request;

