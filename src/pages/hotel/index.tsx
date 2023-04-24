import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Cascader, Col, Form, Input, Row, Select, Space, Avatar, List, message, Image, Popover, Empty } from 'antd';
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
import MapComponent from '@/components/BaiduMaps';
import convertToCoordinates from '@/utils/AddressToPointMap';
import { HotelVirtualListItem } from '@/components/HotelVirtualListItem';

export default function Home() {
  //定义组件内部使用的state：data(酒店列表数据)，total（酒店总数），currentPage（当前页码），queryurl（查询url），ifSearch（搜索状态判断）
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [queryurl, setqueryurl] = useState('')
  const [ifSearch, setIfSearch] = useState(false)
  // markerPosition用于处理地图标记位置，根据鼠标选择的酒店在地图上打印标记点
  const [markerPosition, setMarkerPosition] = useState({ lng: 31.23, lat: 121.47 });
  const [hotel_name, setHotelName] = useState('');
  // 获取表单实例，设置初始化的点击事件
  const [form] = Form.useForm()

  const router = useRouter()

  // 组件加载完成时获取酒店列表数据
  useEffect(() => {
    async function fetchData() {
      const res = await request.get(`/api/hotel/list?page=${currentPage}`)
      setData(res.data)
      setTotal(res.total)
    }
    fetchData()
  }, [])

  // 获取地理位置坐标信息函数（用于设置初始化赋值，直接设置useState会导致初始化异常，所以在组件加载完成后执行一次函数进行初始化）
  async function fetchCoordinates() {
    const { lat, lng } = await convertToCoordinates('上海市');
    setMarkerPosition({ lat, lng });
  }

  // 在组件加载完成后获取地理位置坐标信息
  useEffect(() => {
    fetchCoordinates();
  }, []);

  // 处理表单清空的函数
  const handleSearchReset = (values: any) => {
    form.resetFields()
  }

  // 处理表单提交的函数
  const handleSearchFinish = async (values: HotelQueryType) => {
    try {
      setqueryurl(`&hotel_name=${name}&area=${area[1] !== undefined ? area[1] : ''}&star_number=${star !== undefined ? star : ''}`)
      setCurrentPage(1)
      setIfSearch(true)
      const res = await request.get(`/api/hotel/list?hotel_name=${name}&area=${area[1] !== undefined ? area[1] : ''}&star_number=${star !== undefined ? star : ''}`);
      setData(res.data);

      setTotal(res.total)
      const scrollbox = document.querySelector('#scrollbox>div>div>div>div>div') as Element
      scrollbox.scrollTo(0, 0)
    } catch (error) {
      console.error(error);
    }
  }

  // 滚动条高度与滚动事件
  const ContainerHeight = 700 // 容器高度
  const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
    setIfSearch(false)
    // 当滚动至底部时，判断是否需要加载更多数据（根据total酒店总数进行判断是否发送请求）
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      if (currentPage * 10 < total) {
        setCurrentPage(currentPage + 1)
      } else {
        message.warning('已全部加载完成')
      }
    }
  };

  useEffect(() => {
    if (!ifSearch) {
      appendData()
    }
  }, [currentPage])

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

  const appendData = async () => {
    const res = await request.get(`/api/hotel/list?page=${currentPage}` + queryurl)

    setData(data.concat(res.data))
    if (currentPage !== 1) {
      message.success(`已加载更多`)
    }

  }

  // const onChange = (value: any) => {
  //   console.log(value);
  // };

  // Just show the latest item.
  const displayRender = (labels: string[]) => labels[labels.length - 1];

  const [name, setName] = useState('');
  const [area, setArea] = useState<string[]>([]);
  const [star, setStar] = useState(undefined);

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
    <div style={{ padding: '20px' }}>
      {/* 顶部搜索栏 */}

      <div style={{ paddingRight: 40, paddingLeft: 10, display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-start' }} >
        <div className={styles.tabletitle} >酒店预订</div>
        <Form
          form={form}
          name="search"
          onFinish={handleSearchFinish}
          initialValues={{
            name: '', area: '', star: undefined
          }}
          className={styles.searchform}
          style={{ marginTop: 20, width: '70%', height: 40, padding: 5 }}
        >
          <Row gutter={30}>
            <Col span={8}>
              <Form.Item name="name" label="酒店名称" className={styles.buttonsearch} >
                <Input placeholder='请输入' allowClear onChange={handleNameChange} />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="area" label="地区" className={styles.buttonsearch}>
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
              <Form.Item name="star" label="星级" className={styles.buttonsearch}>
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
            <Col span={6}>
              <Form.Item>

                <Button type="primary" htmlType="submit" className={styles.buttonsearch}>
                  搜索
                </Button>
                <Button htmlType="submit" onClick={handleSearchReset} className={styles.buttonsearch}>
                  清空
                </Button>

              </Form.Item>
            </Col>
          </Row >
        </Form>
      </div>
      <div className={styles.listwithmap}  >

        <Empty style={{ display: data == null ? 'inline-block' : 'none', width: '100%' }}></Empty>
        <div id='scrollbox'>
          <div style={{ width: 400, position: 'absolute', top: 233, left: 250, zIndex: '1' }}>
            <MapComponent center={markerPosition} markerPosition={markerPosition} hotel_name={hotel_name} />
          </div>
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
                <List.Item key={item.id} className={styles.box} onMouseOver={async () => {
                  const { lat, lng } = await convertToCoordinates(item.location);
                  setMarkerPosition({ lat, lng });
                  setHotelName(item.hotel_name);
                }} >
                  <HotelVirtualListItem key={item.id} item={item} />
                </List.Item>
              )}
            </VirtualList>


          </List>

          {/* 之前实现的一个分页列表
  <List className={styles.list}
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
        </div>

      </div>

    </div >
  )
}

