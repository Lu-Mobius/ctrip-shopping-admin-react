import { Table, Space, Input, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { useState } from 'react';
import { UserListDataType } from '@/type/user';

interface UserTableProps {
    data: UserListDataType[];
    handleDelete: (id: string) => void;
}

const Home: React.FC<UserTableProps> = ({ data, handleDelete }) => {
    const [inputValue, setInputValue] = useState('');

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
                    <div>
                        <Input
                            placeholder="请输入想要查找的用户"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setSelectedKeys(e.target.value ? [e.target.value] : []);
                            }}
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
                            <Button
                                onClick={() => {
                                    setSelectedKeys([]);
                                    setInputValue('');
                                    confirm();
                                }}
                                size="small"
                                style={{ width: 90 }}
                            >
                                清空
                            </Button>
                        </Space>
                    </div>
                </div>
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
                <div className={record.role === 'admin' ? styles.admin_row : styles.user_row}>{text}</div>
            ),
        },
        {
            title: '账户余额',
            key: 'balance',
            dataIndex: 'balance',
            sorter: (a, b) => a.balance - b.balance,
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button danger type="default" onClick={() => handleDelete(record._id)}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ];
    return <Table columns={columns} dataSource={data} />;
};

export default Home;