import { Layout } from '@/components/Layout'
import '@/pages/globals.css'
import { ConfigProvider, Skeleton, Spin } from 'antd';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import locale from "antd/locale/zh_CN";
import Head from 'next/head';
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 定义 load 和 setLoad 状态变量，初始值为 false。组件挂载完成，设置成true
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <>
      <Head>
        <title>携程购物管理平台</title>
        <meta name="description" content="携程购物管理平台" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
        <script
          type="text/javascript"
          src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=dRIBHGCAx2QxmSLG8c56U5rOng70Fiju"
        ></script>
        <meta lang="zh-CN" />
      </Head>
      {load ? (
        // <ConfigProvider> 组件，提供全局配置。其中 locale 属性被设置为中文语言包。
        <ConfigProvider locale={locale}>
          {/* 登录页不需要渲染layout */}
          {router.pathname === "/login" ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ConfigProvider>
      ) : (


        <Spin className="loading" tip="正在努力加载中，请稍后" size="large" style={{ width: '100%', height: '100vh', textAlign: 'center' }} />

      )}
    </>
  );
}