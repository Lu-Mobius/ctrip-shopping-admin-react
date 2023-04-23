import { Layout } from '@/components/Layout'
import '@/pages/globals.css'
import { ConfigProvider, Spin } from 'antd';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import locale from "antd/locale/zh_CN";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <>
      {load ? (
        <ConfigProvider locale={locale}>
          {router.pathname === "/login" ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ConfigProvider>
      ) : (
        <Spin className="loading" tip="Loading..." size="large" />
      )}
    </>
  );
}