import React, { useEffect, useState } from 'react';
import { Button, Form, FormInstance, Input, Space, Table, Tag, message, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import request from '@/utils/request';
import styles from "./index.module.css";
import Link from 'next/link';
import { SearchOutlined } from '@ant-design/icons';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Drawer, Radio } from 'antd';
import { Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { PlusOutlined } from '@ant-design/icons';
import RegistrationForm from '@/components/RegisterForm';
import { RegistrationFormValues, UserListDataType } from '@/type/user';
import { clear } from 'console';

export default function Home() {
    const [data, setData] = useState<UserListDataType[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [shouldResetForm, setShouldResetForm] = useState(false);
    const [clear, setClear] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await request.get('/api/users');
            setData(res.data);
        };
        fetchData();
    }, []);

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

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const { confirm } = Modal;
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

        console.log('Received values of form: ', values);
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

    const columns: ColumnsType<UserListDataType> = [
        {
            title: '用户ID',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            onFilter: (value, record) =>
                record.name.includes(value as string) || record.email.includes(value as string),
            filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 20 }}>
                    <div >
                        <Input
                            placeholder="请输入想要查找的用户"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                            }
                            }
                            onPressEnter={() => confirm()}
                            style={{ width: 188, marginBottom: 8, display: 'block' }}
                        />
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => confirm()}
                                size="small"
                                style={{ width: 90 }}
                            >
                                搜索
                            </Button>
                            <Button onClick={clearFilters = () => {
                                setSelectedKeys([]);
                                setInputValue("");
                                confirm();
                            }} size="small" style={{ width: 90 }}>
                                清空
                            </Button>
                        </Space>
                    </div>
                </div >
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
        },
        {
            title: '注册邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '注册手机号',
            key: 'phoneNum',
            dataIndex: 'phoneNum',
        },
        {
            title: '权限',
            key: 'role',
            dataIndex: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
            render: (text, record) => (
                <div className={record.role == 'admin' ? styles.admin_row : styles.user_row}>
                    {text}
                </div>
            )
        },
        {
            title: '账户余额',
            key: 'balance',
            dataIndex: 'balance',
            sorter: (a, b) => a.balance - b.balance
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button danger type="default" onClick={() => handleDelete(record._id)}>删除</Button>
                </Space >
            ),
        },
    ];

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
                    <RegistrationForm clear={clear} onFinish={onFinish} />
                </Drawer>
                <div className={styles.tabletitle} >用户管理</div>
                <div className={styles.addbutton}>
                    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                        新建用户
                    </Button>
                </div>
            </div>
            <Table columns={columns} dataSource={data} />
        </div >
    )
}
