import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useRouter } from 'next/router'


// 利用useRouter()获取
const Post = () => {
  const router = useRouter()
  const { id } = router.query
  return <p>id: {id}</p>
}


export default function Home() {
  return (


    Post()
  )
}
