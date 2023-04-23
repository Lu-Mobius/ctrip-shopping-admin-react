import { Main } from 'next/document'
import Head from 'next/head'
import Image from 'next/image'
import request from "@/utils/request";
import styles from "./index.module.css";
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';
import { UserLoginType } from '@/type/user';
import classnames from "classnames";
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegistrationForm from '@/components/RegisterForm';
import { RegistrationFormValues } from '@/type/user';

export default function Home() {
  const router = useRouter();
  // 定义 onFinish 函数，用于处理登录表单提交事件
  const [isLogin, setIsLogin] = useState(true); // 默认显示登录表单

  const onFinish = async (values: UserLoginType) => {
    try {
      console.log("🚀 ~ file: index.tsx:17 ~ onFinish ~ values:", values)
      const res = await request.post("/api/login", values);

      console.log(
        "%c [ res ]-17",
        "font-size:13px; background:pink; color:#bf2c9f;",
        res
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      message.success("登陆成功");
      router.push("/hotel");
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishRegister = async (values: RegistrationFormValues) => {

    console.log('Received values of form: ', values);
    try {
      const response = await request.post("/api/register", values);
      if (response.success) {
        message.success('创建用户成功！')
        setIsLogin(!isLogin);
      } if (response.exist) {
        message.error('用户已存在，不允许重复创建！')
      } else {
        message.error('创建用户失败，请重试')
      }
      // TODO: 提交表单数据到后端
    } catch (error) {
      console.error("Registration error:", error);
      message.error('服务器异常，请重试')
      // 处理注册失败的情况，比如显示错误提示
    }
  }
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Head>
        <title>登陆</title>
        <meta name="description" content="携程购物管理平台" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.switcher}>
            <span className={classnames(styles.switcherItem, { [styles.active]: isLogin, })} onClick={toggleForm}>
              登录
            </span>
            <span
              className={classnames(styles.switcherItem, {
                [styles.active]: !isLogin,
              })}
              onClick={toggleForm}
            >
              注册
            </span>
          </div>
        </header>
        <div className={styles.form}>
          {isLogin ? (
            <LoginForm onFinish={onFinish} />
          ) : (
            <RegistrationForm clear={false} onFinish={onFinishRegister} />
          )}
        </div>
      </main>
    </>
  );
}