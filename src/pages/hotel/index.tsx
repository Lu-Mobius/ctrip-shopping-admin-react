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
import { getHotelList } from '@/api/hotel';
import { HotelQueryType, SearchOptionType } from '@/type/hotel';
import { promises } from 'dns';
import request from '@/utils/request';
import qs from 'qs';

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
      const res = await request.get('/api/hotel/list')
      console.log("🚀 ~ file: index.tsx:34 ~ fetchData ~ res:", res)
      setData(res.data)
    }
    fetchData()
  }, [])

  const handleSearchFinish = async (values: HotelQueryType) => {
    try {
      const queryString = qs.stringify(values);
      const res = await request.get(`/api/hotel/list?name=${name}&area=${area == undefined ? area[1] : ''}&star=${star == undefined ? star : ''}`);
      setData(res.data);
      console.log("🚀 ~ file: index.tsx:48 ~ handleSearchFinish ~ res:", res)
    } catch (error) {
      console.error(error);
    }
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
        { value: '静安区', label: '静安区', },
        { value: '宝山区', label: '宝山区', },
        { value: '嘉定区', label: '嘉定区 ', },
        { value: '徐汇区', label: '徐汇区', },
        { value: '普陀区', label: '普陀区', },
        { value: '杨浦区', label: '杨浦区', },
        { value: '浦东新区', label: '浦东新区', },
        { value: '虹口区', label: '虹口区', },
        { value: '长宁区', label: '长宁区', },
        { value: '黄浦区', label: '黄浦区', },
      ],
    },
  ];

  const appendData = () => {
    const res = request.get('/api/hotel/list')
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

  const [name, setName] = useState('');
  console.log("🚀 ~ file: index.tsx:97 ~ name:", name)
  const [area, setArea] = useState<string[]>([]);
  console.log("🚀 ~ file: index.tsx:99 ~ area:", area)
  const [star, setStar] = useState(undefined);
  console.log("🚀 ~ file: index.tsx:101 ~ star:", star)
  const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleAreaChange = (value: string[]) => {
    setArea(value);
  };

  const handleStarChange = (value: React.SetStateAction<undefined>) => {
    setStar(value);
  };

  return (
    <div style={{ padding: 30 }}>
      {/* 顶部搜索栏 */}
      <div style={{ paddingLeft: 50 }}>
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
                <Input placeholder='请输入' allowClear onChange={handleNameChange} />
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
                  // 这里类型一直报错，所以
                  onChange={handleAreaChange as any}
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
                    { value: '1', label: '一星级' },
                    { value: '2', label: '二星级' },
                    { value: '3', label: '三星级' },
                    { value: '4', label: '四星级' },
                    { value: '5', label: '五星级' },

                  ]}
                  onChange={handleStarChange}
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
      </div>
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
                  <Link href={{ pathname: '/hotel/details' }}  >
                  <Button type="primary" className={styles.button} >查看详情</Button>

                  </Link>


                </div>
              </div>
            ]}
          >            
          </List.Item > */}
      <div>
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
                  <Image className={styles.leftimage} src={item.img_show} />

                  <div className={styles.titlebox}>
                    <div className={styles.title}>{item.hotel_name}</div>

                    <div className={styles.starbox} style={{ display: item.star_number > '0' ? 'inline-block' : 'none' }}>
                      <div style={{ display: item.star_number >= '1' ? 'inline-block' : 'none' }} >⭐</div>
                      <div style={{ display: item.star_number >= '2' ? 'inline-block' : 'none' }}>⭐</div>
                      <div style={{ display: item.star_number >= '3' ? 'inline-block' : 'none' }}>⭐</div>
                      <div style={{ display: item.star_number >= '4' ? 'inline-block' : 'none' }}>⭐</div>
                      <div style={{ display: item.star_number >= '5' ? 'inline-block' : 'none' }} >⭐</div>
                    </div>
                    <div className={styles.cooperationbox}>
                      <Popover content={'携程紧密合作酒店/供应商，为携程会员提供优惠房价。'} trigger="hover">
                        <div style={{ display: item.cooperation_level == '1' ? 'inline-block' : 'none' }}
                          className={styles.cooperationicon1}></div>
                      </Popover>
                      <Popover content={'携程战略合作酒店/供应商，拥有优质服务、优良品质及优惠房价。'} trigger="hover">
                        <div style={{ display: item.cooperation_level == '2' ? 'inline-block' : 'none' }}
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
                  <Link href={{ pathname: '/hotel/details' }}  >
                    <div className={styles.pricebox}>
                      <div className={styles.price}>￥{item.price}</div>
                      <div className={styles.pricetext}>起</div>
                    </div>
                  </Link>
                  {/* 查看详情按钮 */}
                  <div style={{ marginLeft: 'auto' }}>
                    {/* <Link href={{ pathname: '/hotel/details?id='}} data-id={item.id}> */}
                    <Button type="primary" className={styles.button} onClick={() => {
                      router.push({
                        pathname: '/hotel/details',
                        query: { id: item._id },
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
      </div>

    </div >
  )
}

