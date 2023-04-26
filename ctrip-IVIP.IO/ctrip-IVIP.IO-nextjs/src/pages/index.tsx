import { useRouter } from 'next/router'
import { useEffect } from 'react'

// 这里是http://localhost:3001/页面，因为我们的首页就是/hotel页面，所以当用户访问到本页面时，会重定向到/hotel（hotel页面会判断用户是否登录）
export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/hotel')
  }, [])

  return (
    <>
    </>
  )
}
