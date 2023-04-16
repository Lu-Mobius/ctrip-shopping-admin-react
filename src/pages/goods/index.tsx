import React, { useEffect, useState } from 'react';
import { Button, Cascader, Col, Form, Input, Row, Select, Space, Avatar, List, message, Image, Popover } from 'antd';
import VirtualList from 'rc-virtual-list';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { getOverflowOptions } from 'antd/es/_util/placements';
import axios from 'axios'
import styles from './index.module.css';
import { link } from 'fs';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { NavLink } from 'react-router-dom';
import { getHotelList } from '../api/hotel';
import { HotelQueryType, SearchOptionType } from '@/type/hotel';
import { promises } from 'dns';



// const data = Array.from({ length: 23 }).map((_, i) => ({
//   "id": "83",
//   "hotel_name": "麗枫酒店(上海虹桥火车站国家会展中心店)",
//   "rating": "4.2",
//   "area": "静安区",
//   "star_number": 24,
//   "price": 190,
//   "avatar": "https://dimg04.c-ctrip.com/images/0200f1200096kvwge4E72_R_600_400_R5_D.jpg"
// }));

// const staticData = [
//   {
//     "id": "83",
//     "hotel_name": "麗枫酒店(上海虹桥火车站国家会展中心店) 1",
//     "star_number": "4.2",
//     "area": "静安区",
//     "rating": 24,
//     "price": 190,
//     "avatar": "https://dimg04.c-ctrip.com/images/0200f1200096kvwge4E72_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "82",
//     "hotel_name": "上海浦东国际机场迪航酒店",
//     "star_number": "4.7",
//     "area": "浦东新区",
//     "rating": 132,
//     "price": 184,
//     "avatar": "https://dimg04.c-ctrip.com/images/0AD15120009fce3os544F_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "83",
//     "hotel_name": "麗枫酒店(上海虹桥火车站国家会展中心店)2",
//     "star_number": "4.2",
//     "area": "静安区",
//     "rating": 24,
//     "price": 190,
//     "avatar": "https://dimg04.c-ctrip.com/images/0200f1200096kvwge4E72_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "82",
//     "hotel_name": "上海浦东国际机场迪航酒店",
//     "star_number": "4.7",
//     "area": "浦东新区",
//     "rating": 132,
//     "price": 184,
//     "avatar": "https://dimg04.c-ctrip.com/images/0AD15120009fce3os544F_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "83",
//     "hotel_name": "麗枫酒店(上海虹桥火车站国家会展中心店)3",
//     "star_number": "4.2",
//     "area": "静安区",
//     "rating": 24,
//     "price": 190,
//     "avatar": "https://dimg04.c-ctrip.com/images/0200f1200096kvwge4E72_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "82",
//     "hotel_name": "上海浦东国际机场迪航酒店",
//     "star_number": "4.7",
//     "area": "浦东新区",
//     "rating": 132,
//     "price": 184,
//     "avatar": "https://dimg04.c-ctrip.com/images/0AD15120009fce3os544F_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "83",
//     "hotel_name": "麗枫酒店(上海虹桥火车站国家会展中心店)4",
//     "star_number": "4.2",
//     "area": "静安区",
//     "rating": 24,
//     "price": 190,
//     "avatar": "https://dimg04.c-ctrip.com/images/0200f1200096kvwge4E72_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "82",
//     "hotel_name": "上海浦东国际机场迪航酒店",
//     "star_number": "4.7",
//     "area": "浦东新区",
//     "rating": 132,
//     "price": 184,
//     "avatar": "https://dimg04.c-ctrip.com/images/0AD15120009fce3os544F_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "83",
//     "hotel_name": "麗枫酒店(上海虹桥火车站国家会展中心店)5",
//     "star_number": "4.2",
//     "area": "静安区",
//     "rating": 24,
//     "price": 190,
//     "avatar": "https://dimg04.c-ctrip.com/images/0200f1200096kvwge4E72_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "82",
//     "hotel_name": "上海浦东国际机场迪航酒店",
//     "star_number": "4.7",
//     "area": "浦东新区",
//     "rating": 132,
//     "price": 184,
//     "avatar": "https://dimg04.c-ctrip.com/images/0AD15120009fce3os544F_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "83",
//     "hotel_name": "麗枫酒店(上海虹桥火车站国家会展中心店)6",
//     "star_number": "4.2",
//     "area": "静安区",
//     "rating": 24,
//     "price": 190,
//     "avatar": "https://dimg04.c-ctrip.com/images/0200f1200096kvwge4E72_R_600_400_R5_D.jpg"
//   },
//   {
//     "id": "82",
//     "hotel_name": "上海浦东国际机场迪航酒店",
//     "star_number": "4.7",
//     "area": "浦东新区",
//     "rating": 132,
//     "price": 184,
//     "avatar": "https://dimg04.c-ctrip.com/images/0AD15120009fce3os544F_R_600_400_R5_D.jpg"
//   },
// ]


const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space >
    <div >
      {React.createElement(icon)}
    </div>
    <div >
      {text}
    </div>
  </Space >
);

export default function Home() {
  //useState hook更新data状态
  const [data, setData] = useState([])

  // 获取表单实例，设置初始化的点击事件
  const [form] = Form.useForm()

  const handleSearchReset = (values: any) => {
    form.resetFields()
  }

  const router = useRouter()
  // 空数组表示页面dom加载完毕时触发,获取hotel列表
  useEffect(() => {
    async function fetchData() {
      const res: any = await getHotelList()
      console.log("🚀 ~ file: index.tsx:166 ~ fetchData ~ res:", res)
      const { data } = res
      setData(data)

    }
    fetchData()
  }, [])

  const handleSearchFinish = (values: HotelQueryType) => {
    getHotelList(values)
  }

  // 滚动条高度与滚动事件
  const ContainerHeight = 700
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  const options: SearchOptionType[] = [
    {
      value: 'Shanghai',
      label: '上海',
      children: [
        { value: 'baoshan', label: '宝山', },
        { value: 'jiading', label: '嘉定', },
      ],
    },
  ];

  const appendData = () => {
    const res: any = getHotelList()
    res.then((result: any) => {
      setData(data.concat(result.data))
    })
    message.success(`10 more items loaded!`)
  }

  // const onChange = (value: any) => {
  //   console.log(value);
  // };

  // Just show the latest item.
  const displayRender = (labels: string[]) => labels[labels.length - 1];
  console.log(data)
  return (
    <div style={{ padding: 30 }}>
      {/* 顶部搜索栏 */}
      <Form
        form={form}
        name="search"

        onFinish={handleSearchFinish}
        initialValues={{
          name: '', area: '', star: undefined
        }}
      >
        <Row gutter={30}>
          <Col span={8}>
            <Form.Item name="name" label="酒店名称" >
              <Input placeholder='请输入' allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="area" label="地区" >
              <Cascader
                showSearch
                allowClear
                placeholder='请选择'
                options={options}
                expandTrigger="hover"
                displayRender={displayRender}
              // onChange={onChange}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="star" label="星级" >
              <Select
                placeholder='请输入'
                showSearch
                // 按照label值进行搜索
                optionFilterProp='label'
                allowClear
                options={[
                  { value: 'onestar', label: '一星级' },
                  { value: 'twostar', label: '二星级' },
                  { value: 'threestar', label: '三星级' },
                  { value: 'fourstar', label: '四星级' },
                  { value: 'fivestar', label: '五星级' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button htmlType="submit" onClick={handleSearchReset}>
                  清空
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row >
      </Form>
      {/* <List className={styles.list}
        itemLayout="vertical"
        size="large"

        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={data}
        footer={
          <div>
          </div>
        }
        renderItem={(item: any) => (
          <List.Item
            key={item.id}
            actions={[
              <div className={styles.box}>
                <div className={styles.titlebox}>
                  <Image className={styles.titleimage} src={item.avatar} />
                  <div className={styles.title}>{item.hotel_name}</div>
                </div>
                <div className={styles.extrabox}>
                  <div className={styles.scorebox}>
                    <div className={styles.star_box}>
                      <IconText icon={StarOutlined} text={item.star_number.toString()} key="list-vertical-star-o" />
                    </div>
                    <div className={styles.rate_number}>{item.rating}</div>
                  </div>
                  <div className={styles.pricebox}>
                    <div className={styles.price}>￥{item.price}</div>
                    <div className={styles.pricetext}>起</div>
                  </div>
                  <Link href={{ pathname: '/goods/details' }}  >
                  <Button type="primary" className={styles.button} >查看详情</Button>

                  </Link>


                </div>
              </div>
            ]}
          >            
          </List.Item > */}

      <List >
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={100}
          itemKey="id"
          onScroll={onScroll}
          className={styles.list}
        >
          {(item: any) => (
            <List.Item key={item.id} className={styles.box}>


              {/* 左边栏 */}
              <div className={styles.leftbox}>
                <Image className={styles.leftimage} src={item.avatar} />

                <div className={styles.titlebox}>
                  <div className={styles.title}>{item.hotel_name}</div>

                  <div className={styles.starbox} style={{ display: item.star_number > '0' ? 'inlineblock' : 'none' }}>
                    <div style={{ display: item.star_number >= '1' ? 'inlineblock' : 'none' }} >⭐</div>
                    <div style={{ display: item.star_number >= '2' ? 'inlineblock' : 'none' }}>⭐</div>
                    <div style={{ display: item.star_number >= '3' ? 'inlineblock' : 'none' }}>⭐</div>
                    <div style={{ display: item.star_number >= '4' ? 'inlineblock' : 'none' }}>⭐</div>
                    <div style={{ display: item.star_number >= '5' ? 'inlineblock' : 'none' }} >⭐</div>
                  </div>
                  <div className={styles.cooperationbox}>
                    <Popover content={'携程紧密合作酒店/供应商，为携程会员提供优惠房价。'} trigger="hover">
                      <div style={{ display: item.cooperation_level == '1' ? 'inlineblock' : 'none' }}
                        className={styles.cooperationicon1}></div>
                    </Popover>
                    <Popover content={'携程战略合作酒店/供应商，拥有优质服务、优良品质及优惠房价。'} trigger="hover">
                      <div style={{ display: item.cooperation_level == '2' ? 'inlineblock' : 'none' }}
                        className={styles.cooperationicon2}></div>
                    </Popover>
                  </div>




                </div>

              </div>
              {/* 右边栏 */}
              <div className={styles.rightbox}>
                <div className={styles.scorebox}>
                  <div className={styles.comment_box}>
                    <div style={{ display: item.rating == 4.5 ? 'inline' : 'none' }} className={styles.rating_level}>不错</div>
                    <div style={{ display: item.rating == 4.6 ? 'inline' : 'none' }} className={styles.rating_level}>不错</div>
                    <div style={{ display: item.rating == 4.7 ? 'inline' : 'none' }} className={styles.rating_level}>不错</div>
                    <div style={{ display: item.rating == 4.8 ? 'inline' : 'none' }} className={styles.rating_level}>不错</div>
                    <div style={{ display: item.rating == 4.9 ? 'inline' : 'none' }} className={styles.rating_level}>不错</div>
                    <div style={{ display: item.rating == 5.0 ? 'inline' : 'none' }} className={styles.rating_level}>不错</div>


                    <div className={styles.comment_number}>{item.comments_number}条评论</div>


                  </div>
                  <div className={styles.rate_number}>{item.rating}</div>
                </div>
                {/* 价格 */}
                <Link href={{ pathname: '/goods/details' }}  >
                  <div className={styles.pricebox}>
                    <div className={styles.price}>￥{item.price}</div>
                    <div className={styles.pricetext}>起</div>
                  </div>
                </Link>
                {/* 查看详情按钮 */}
                <div style={{ marginLeft: 'auto' }}>
                  {/* <Link href={{ pathname: '/goods/details?id='}} data-id={item.id}> */}
                  <Button type="primary" className={styles.button} onClick={() => {
                    router.push({
                      pathname: '/goods/details',
                      query: { id: item.id },
                    })
                  }
                  }>查看详情</Button>
                  {/* </Link> */}
                </div>

              </div>

            </List.Item>
          )}
        </VirtualList>
      </List>

    </div >
  )
}

