import { FC } from "react";
import { Form, Input, Button } from "antd";
import classnames from "classnames";
import styles from "./index.module.css";

interface LoginFormProps {
    onFinish: (values: any) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onFinish }) => {
    return (
        <Form
            name="basic"
            initialValues={{ name: "", password: "" }}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            size="large"
        >
            <Form.Item
                name="name"
                label={<span className={styles.label}>账号</span>}
                rules={[{ required: true, message: "请输入用户名" }]}
            >
                <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
                name="password"
                label={<span className={styles.label}>密码</span>}
                rules={[{ required: true, message: "请输入密码" }]}
            >
                <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                    className={classnames(styles.btn, styles.loginBtn)}
                    size="large"
                >
                    登陆
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;