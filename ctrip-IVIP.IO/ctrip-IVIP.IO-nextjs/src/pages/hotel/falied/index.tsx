import { Button, Result } from 'antd'
import Head from 'next/head'



export default function Home() {
  return (
    <Result
      status="error"
      title="支付失败，余额不足"
      // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button href="/indent" type="primary" key="console">
          查看订单
        </Button>,
        <Button href="/hotel">浏览其他酒店</Button>,
      ]}
    />
  )
}
