import { useRouter } from 'next/router'
import { Col, Row } from 'antd';
import styles from './index.module.css';




// 利用useRouter()获取
const Post = () => {
  const router = useRouter()
  const { id } = router.query
  return <p>id: {id}</p>
}


export default function Home() {
  return (
    <>
      <Row class>

      </Row>
      <Row>

      </Row>
      <Row>

      </Row>

    </>
  )
}
