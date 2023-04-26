import React, { useState } from 'react';
import { Button, message, } from 'antd';
import request from '@/utils/request';
import styles from "./index.module.css";
import { SearchOutlined } from '@ant-design/icons';
import { Drawer, } from 'antd';
import { Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import RegistrationForm from '@/components/RegisterForm';
import { RegistrationFormValues, UserListDataType } from '@/type/user';
import UserManagementList from '@/components/UserManagementList';
import { useDebouncedCallback } from '@/utils/debounce';

// 从getServerSideProps获取用户数据列表ssr_data
export default function Home({ ssr_data }: { ssr_data: UserListDataType[]; }) {

    // 定义了一些状态
    const [data, setData] = useState<Array<UserListDataType>>(ssr_data);
    const [clear, setClear] = useState(false);
    const [open, setOpen] = useState(false);

    const { confirm } = Modal;

    const handleDelete = async (userId: string) => {
        try {
            await request.delete(`/api/users/${userId}`);
            const res = await request.get('/api/users');
            setData(res.data);
            message.success('删除成功')
        } catch (error) {
            console.log('Delete failed', error);
            message.success('删除失败，请重试')
        }
    }

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        confirm({
            title: '您确定要取消创建用户吗？',
            onOk() {
                setOpen(false);
            },
            onCancel() {
                // do nothing
            },
        });
    };

    // 用户注册的表单提交
    const onFinish = async (values: RegistrationFormValues) => {
        try {
            const response = await request.post("/api/users", values);
            if (response.success) {
                message.success('创建用户成功！')
                const res = await request.get('/api/users');
                setData(res.data);
                setClear((prevClear) => !prevClear);//每次创建用户将setClear取反，表单清空
                setOpen(false);
            } else if (response.exist) {
                message.error('用户已存在，不允许重复创建！')
            } else
                message.error('创建用户失败，请重试')
            // TODO: 提交表单数据到后端
        } catch (error) {
            console.error("Registration error:", error);
            message.error('服务器异常，请重试')
            // 处理注册失败的情况，比如显示错误提示
        }
    }

    const debouncedonFinish = useDebouncedCallback(onFinish, 500);


    return (
        <div className={styles.table} >
            <div className={styles.header} >
                <Drawer
                    title="新增用户"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    open={open}
                    getContainer={false}
                    style={{ zIndex: 1000, }}
                    width={'50%'}
                    extra={
                        <Button type="primary" ghost onClick={onClose} style={{ marginRight: 20 }}>取消创建</Button>
                    }
                >
                    <RegistrationForm clear={clear} onFinish={debouncedonFinish} />
                </Drawer>
                <div className={styles.tabletitle} >用户管理</div>
                <div className={styles.addbutton}>
                    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                        新建用户
                    </Button>
                </div>
            </div>
            <UserManagementList data={data} handleDelete={handleDelete} />
        </div >
    )
}


export async function getServerSideProps() {
    const res = await request.get('/api/users');
    const ssr_data = res.data;
    return { props: { ssr_data } };
}
