import { RegistrationFormValues } from '@/type/user';
import request from '@/utils/request';
import { Form, Input, Select, Button, message, FormInstance } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;


interface RegistrationFormProps {
    onFinish: (values: RegistrationFormValues) => void;
    clear: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onFinish, clear }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }
        , [clear]);
    console.log("🚀 ~ file: index.tsx:22 ~ clear:", clear)

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                role: 'user',
            }}
            scrollToFirstError
            autoComplete="off"

        >
            <Form.Item
                style={{ marginBottom: '30px' }}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                name="name"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                ]}
            >
                <Input autoComplete="off" />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: '30px' }}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                name="email"
                label="邮箱"
                rules={[
                    {
                        type: 'email',
                        message: '请输入正确的邮箱格式',
                    },
                    {
                        required: true,
                        message: '请输入邮箱',
                    },
                ]}
            >
                <Input autoComplete="off" />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: '30px' }}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                name="phoneNum"
                label="手机号"
                rules={[
                    {
                        required: true,
                        message: '请输入手机号',
                    },
                    {
                        pattern: /^1\d{10}$/,
                        message: '请输入正确的手机号',
                    },
                ]}
            >
                <Input autoComplete="off" />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: '30px' }}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
                hasFeedback
            >
                <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: '30px' }}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请确认密码',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('两次输入的密码不一致');
                        },
                    }),
                ]}
            >
                <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: '30px' }}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                name="role"
                label="角色"
                rules={[
                    {
                        required: true,
                        message: '请选择角色',
                    },
                ]}
            >
                <Select>
                    <Option value="user">普通用户</Option>
                    <Option value="admin">管理员</Option>
                </Select>
            </Form.Item>

            <Form.Item
                style={{ marginBottom: '30px' }}
                labelCol={{ span: 1 }}
                wrapperCol={{ span: 8 }}
            >

                <Button type="primary" htmlType="submit" style={{ left: '212%', width: '100px', height: '40px' }}>
                    创建用户
                </Button>
            </Form.Item>
        </Form >
    );
};

export default RegistrationForm;