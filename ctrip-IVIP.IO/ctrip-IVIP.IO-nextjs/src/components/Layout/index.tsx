import React, { PropsWithChildren, ReactNode, useEffect, useMemo, useReducer, useState } from 'react';
import { MenuProps, message } from 'antd';
import { Layout as Antdlayout, Menu } from 'antd';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Head from 'next/head'
import { USER_ROLE } from "@/constants";
import styles from './index.module.css';
import { setLogout } from '@/api/user';
import { SnippetsOutlined, HomeOutlined } from "@ant-design/icons";
import Link from 'next/link';
import request from '@/utils/request';
import { useCurrentUser } from '@/utils/useCurrentUser';
import { createContext } from "react";
import { UserType } from '@/type/user';

export const UserContext = createContext<UserType | null>(null);

const { Header, Content, Sider } = Antdlayout;

const ITEMS = [
    {
        key: " hotel",
        label: "我的",
        role: USER_ROLE.USER,
        icon: <HomeOutlined />,
        children: [
            { label: "酒店预订", key: "/hotel", role: USER_ROLE.USER, },
            { label: "订单查询", key: "/indent", role: USER_ROLE.USER, },
        ],
    },
    {
        key: "management ",
        label: "后台管理",
        role: USER_ROLE.ADMIN,
        icon: <SnippetsOutlined />,
        children: [
            { label: "订单管理", key: "/management", role: USER_ROLE.ADMIN },
            { label: "用户管理", key: "/management/user", role: USER_ROLE.ADMIN },
        ],
    },
]

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const user = useCurrentUser();

    const activeMenu = router.pathname;
    const defaultOpenKeys = [activeMenu.split("/")[1]];

    const handlemenuclick: MenuProps["onClick"] = ({ key }) => {
        router.push(key);
    }

    const user_items: MenuProps['items'] = [
        {
            label: <Link href='/indent'>我的订单</Link>,
            key: '0',
        },
        {
            label: (<div
                onClick={() => {
                    const res = request.get(`/api/logout`)
                    localStorage.removeItem("user");
                    message.success("退出成功");
                    router.push("/login");
                }}
            >
                登出
            </div>),
            key: '1',
        },
    ];

    const items = useMemo(() => {
        if (user?.role === USER_ROLE.USER) {
            return ITEMS.filter((item) => {
                // if (item.children) {
                //     item.children = item.children.filter(
                //         (k) => k.role === USER_ROLE.USER
                //     );
                // }
                return item.role === USER_ROLE.USER;
            });
        } else {
            return ITEMS;
        }
    }, [user]);

    return (
        <div className={styles.body}>
            <main>
                <Antdlayout>
                    <Header className={styles.header}>
                        <Image src='/financeLogo.png' width={40} height={40} className={styles.financeLogo} alt='' />
                        携程购物管理平台
                        {/* 用户下拉菜单 */}
                        <span className={styles.user}>
                            <Dropdown menu={{ items: user_items }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {user?.name}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </span>
                    </Header>
                    <Antdlayout className={styles.sectionInner}>
                        <Sider width={200} >
                            <Menu
                                mode="inline"
                                selectedKeys={[activeMenu]}
                                defaultOpenKeys={defaultOpenKeys}
                                style={{ height: '100%', borderRight: 0 }}
                                items={items}
                                onClick={handlemenuclick}
                            />
                        </Sider>
                        <Antdlayout className={styles.sectioncontent}>
                            {/* 在子组件中使用 const user = useContext(UserContext) */}
                            <UserContext.Provider value={user}>
                                <Content className={styles.content}>
                                    {children}
                                </Content>
                            </UserContext.Provider>
                        </Antdlayout>
                    </Antdlayout>
                </Antdlayout>
            </main>
        </div>
    )
}

