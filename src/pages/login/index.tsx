
import Head from 'next/head'
import request from "@/utils/request";
import styles from "./index.module.css";
import { Space, Tabs, message } from 'antd';
import { useRouter } from 'next/router';
import { UserLoginType } from '@/type/user';
import classnames from "classnames";
import { SetStateAction, useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegistrationForm from '@/components/RegisterForm';
import { RegistrationFormValues } from '@/type/user';
import ReactPlayer from 'react-player';
import BackgroundVideo from '@/components/BackgroundVideo';
import type { TabsProps } from 'antd';


export default function Home() {
  const router = useRouter();
  // 定义 onFinish 函数，用于处理登录表单提交事件
  const [isLogin, setIsLogin] = useState(true); // 默认显示登录表单
  const [activeTab, setActiveTab] = useState('login');

  const onFinish = async (values: UserLoginType) => {
    try {
      console.log("🚀 ~ file: index.tsx:17 ~ onFinish ~ values:", values)
      const res = await request.post("/api/login", values);
      console.log(
        "%c [ res ]-17",
        "font-size:13px; background:pink; color:#bf2c9f;",
        res
      );
      if (res.success == true) {
        localStorage.setItem("user", JSON.stringify(res.data));
        message.success("登陆成功");
        router.push("/hotel");
      } else if (res.exist) {
        localStorage.clear();
        message.error("该用户不存在");
      } else {
        localStorage.clear();
        message.error("密码错误，登陆失败！");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const onFinishRegister = async (values: RegistrationFormValues) => {

    console.log('Received values of form: ', values);
    try {
      const response = await request.post("/api/users", values);
      if (response.success) {
        message.success('创建用户成功！')
        setActiveTab('login')
      } else if (response.exist) {
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
  const handleTabChange = (key: SetStateAction<string>) => {
    setActiveTab(key);
    setIsLogin(key === 'login');
  };

  const items: TabsProps['items'] = [
    {
      key: 'login',
      label: (
        <div
          className={classnames(styles.tabItem, {
            [styles.active]: activeTab === 'login',
          })}
          onClick={() => handleTabChange('login')}
        >
          登录
        </div>
      ),
      children: (
        <div>
          <LoginForm onFinish={onFinish} />
        </div>
      ),
    },
    {
      key: 'register',
      label: (
        <div
          className={classnames(styles.tabItem, {
            [styles.active]: activeTab === 'register',
          })}
          onClick={() => handleTabChange('register')}
        >
          注册
        </div>
      ),
      children: (
        <div>
          <RegistrationForm clear={false} onFinish={onFinishRegister} />
        </div>
      ),
    },
  ]

  return (
    <>
      <Head>
        <title>携程购物管理平台</title>
        <meta name="description" content="携程购物管理平台" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/financeLogo.png" />
      </Head>
      <div className={styles.body}>
        <div className={styles.background}>
          <BackgroundVideo />
        </div>
        <div className={styles.loginbox}>
          <div className={styles.form}>
            <div className={styles.formhead}>
              <div className={styles.formimg}>
                <img src="https://webresource.c-ctrip.com/ares2/nfes/pc-home/1.0.65/default/image/logo.png" alt="ctripicon" width={180} />
              </div>
              <div className={styles.formtitle}>内部酒店预订管理平台</div>
            </div>

            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              tabBarStyle={{ border: 'none' }}
              tabBarGutter={16}
              items={items}
            >
            </Tabs>
          </div>
        </div>
      </div>

    </>
  );
}