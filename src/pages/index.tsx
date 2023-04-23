import Head from 'next/head'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/hotel')
  }, [])
  return (
    <>
      <Head>
        <title>携程购物管理平台</title>
        <meta name="description" content="携程购物管理平台" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/financeLogo.png" />
      </Head>
      <main ></main>
    </>
  )
}
