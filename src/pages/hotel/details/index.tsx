import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Anchor, Avatar, Breadcrumb, Button, Col, Divider, Dropdown, List, Modal, Popover, Row, Select, Space, message } from 'antd';
import styles from './index.module.css';
import { useRef } from 'react';
import { HotelComment, HotelDataType, HotelDetailQueryType } from '@/type/hotel';
import { getHotelDetail } from '@/api/hotel';
import Link from 'next/link';
import 'remixicon/fonts/remixicon.css';
import { Image } from 'antd';
import { DatePickerModule } from '@/components/DatePicker'
import dayjs from 'dayjs';
import RoomSelector from '@/components/RoomSelector';
import StarBox from '@/components/Starbox';
import request from '@/utils/request';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { UserType } from '@/type/user';
import { useCurrentUser } from '@/utils/useCurrentUser';
import MapComponent from '@/components/BaiduMaps';
import convertToCoordinates from '@/utils/AddressToPointMap';

export default function Home() {

  // 设置锚点滚动偏移量
  const topRef = useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState<number>();

  useEffect(() => {
    setTargetOffset(topRef.current?.offsetHeight);
  }, []);

  const currentUser = useCurrentUser();
  const [data, setData] = useState<any>([])
  const [CommentArry, setCommentArr] = useState<any>([])

  // 处理日期选择表单的hook
  const [selectedDateRange, setSelectedDateRange] = useState<any[]>([]);
  const [dateRangeDiff, setDateRangeDiff] = useState<number>(0); // 存储时间差
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);

  const handleBookButtonClick = (stock: any, packageOptionsIndex: any, price: any, room_name: any) => {
    const hasSelectedDate = selectedDateRange.some(date => !!date);

    const maxGuestCount = roomCount > stock ? stock * 2 : roomCount * 2;
    // 添加最小人数限制
    const minGuestCount = roomCount;

    if (hasSelectedDate && stock >= roomCount && guestCount <= maxGuestCount && guestCount >= minGuestCount && dateRangeDiff) {
      // 正常跳转
      router.push({
        pathname: '/hotel/details/order',
        query: {
          id: data._id,
          hotel_name: data.hotel_name,
          star_number: data.star_number,
          location: data.location,
          room_name: room_name,
          price: price,
          packageOptionsIndex: packageOptionsIndex,
          selectedDateRange: selectedDateRange,
          dateRangeDiff: dateRangeDiff,
          roomCount: roomCount,
          guestCount: guestCount
        }


      });
    } else {
      let errorMessage;
      let confirmButtonDisabled = false;
      let confirmButtonText = '确认预定';

      if (dateRangeDiff === 0) {
        errorMessage = `请选择至少一个晚上`;
        confirmButtonDisabled = true;
      } else if (stock < roomCount && guestCount > maxGuestCount) {
        errorMessage = `抱歉！您所选的房型仅剩${stock}间，最多可容纳${stock * 2}位客人入住。`;
      } else if (stock < roomCount && guestCount < minGuestCount) {
        errorMessage = `抱歉！您所选的房型仅剩${stock}间，最少需要${stock}位客人入住。`;
      } else if (stock < roomCount) {
        errorMessage = `抱歉！您所选的房型仅剩${stock}间`;
      } else if (guestCount < minGuestCount) {
        errorMessage = `抱歉！至少需要${minGuestCount}位客人入住。`;
      } else {
        errorMessage = `抱歉！您所选的房型最多可容纳${maxGuestCount}位客人入住。`;
      }

      if (roomCount > stock) {
        confirmButtonDisabled = false;
        confirmButtonText = `继续预定`;
      }
      if (guestCount > maxGuestCount) {
        confirmButtonDisabled = false;
        confirmButtonText = `继续预定`;
      } else if (guestCount < roomCount) {
        confirmButtonDisabled = false;
        confirmButtonText = `继续预定`;
      }


      Modal.confirm({
        title: errorMessage,
        content: '请确认您的日期、房间数和人数。',
        okText: confirmButtonText,
        okButtonProps: {
          disabled: confirmButtonDisabled
        },
        onOk() {
          let newRoomCount = roomCount;
          let newGuestCount = guestCount;

          if (roomCount > stock) {
            newRoomCount = stock;
          } else if (roomCount < 1) {
            newRoomCount = 1;
          }

          if (guestCount > maxGuestCount) {
            newGuestCount = maxGuestCount;
          } else if (guestCount < newRoomCount) {
            newGuestCount = newRoomCount;
          }

          setRoomCount(newRoomCount);
          setGuestCount(newGuestCount);
          router.push({
            pathname: '/hotel/details/order',
            query: {
              id: data._id,
              hotel_name: data.hotel_name,
              star_number: data.star_number,
              location: data.location,
              room_name: room_name,
              price: price,
              packageOptionsIndex: packageOptionsIndex,
              selectedDateRange: selectedDateRange,
              dateRangeDiff: dateRangeDiff,
              roomCount: newRoomCount,
              guestCount: newGuestCount,
            }

          });
        }
      });
    }
  };

  const [markerPosition, setMarkerPosition] = useState({ lng: 31.23, lat: 121.47 });
  // 获取地理位置坐标信息函数（用于设置初始化赋值，直接设置useState会导致初始化异常，所以在组件加载完成后执行一次函数进行初始化）

  async function fetchCoordinates() {
    const { lat, lng } = await convertToCoordinates(data.location);
    setMarkerPosition({ lat, lng });
  }

  // 在组件加载完成后获取地理位置坐标信息
  useEffect(() => {
    fetchCoordinates();
  }, [data]);

  // 定义了三个回调函数，从子组件获取状态
  const handleRoomCountChange = (count: number) => {
    setRoomCount(count);
  };

  const handleGuestCountChange = (count: number) => {
    setGuestCount(count);
  };

  const handleDateRangeChange = (dateStrings: any) => {
    setSelectedDateRange(dateStrings);
    const [startString, endString] = dateStrings;
    if (!startString || !endString) {
      setDateRangeDiff(0);
      return;
    }
    const start = dayjs(startString);
    const end = dayjs(endString);
    const diff = end.diff(start, 'day');
    setDateRangeDiff(diff);
  };

  async function fetchData() {

    const { id } = router.query

    if (id !== undefined) {
      const res = await request.get(`/api/hotel/details?_id=${id}`,
      )
      // const res: any = await getHotelDetail(hotel_id)
      setData(res.hoteldetail)
      setCommentArr(res.comArry)
    }
  }

  const router = useRouter()

  useEffect(() => {

    fetchData()
  }, [router.query])

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  // 设置点击anchor事件，阻止路由跳转（anchor底层用a标签实现跳转）
  const handleClick = (
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById('part-1');
    targetElement?.scrollIntoView({ behavior: 'smooth' });
  };

  if (data === undefined) {
    return <div>Loading...</div>;
  }


  return (

    <div id="content" className={styles.content}>
      <Row>
        <Breadcrumb className={styles.breadcrumb}
          items={[
            {
              title: <div style={{ color: '#2681ff' }}>携程</div>,
            },
            {
              title: <Link href="/hotel" style={{ color: '#2681ff' }}>酒店</Link>,
            },
            {
              title: <div style={{ color: '#0f294d' }}>{data.hotel_name}</div>,

            },
          ]}
        />
      </Row>

      <Row className={styles.display_page} >
        <div className={styles.display_page_top}>
          <div className={styles.display_page_top_left}>
            <div className={styles.titlebox} style={{ marginBottom: 4 }}>
              <div className={styles.hotel_name}>{data.hotel_name}</div>
              <StarBox count={!data.star_number ? 0 : data.star_number} />
              <div className={styles.cooperationbox}>
                <Popover content={'携程紧密合作酒店/供应商，为携程会员提供优惠房价。'} trigger="hover">

                  <div style={{ display: data.cooperation_level == '1' ? 'inline-block' : 'none', marginTop: 11 }}
                    className={styles.cooperationicon1}></div>
                </Popover>
                <Popover content={'携程战略合作酒店/供应商，拥有优质服务、优良品质及优惠房价。'} trigger="hover">
                  <div style={{ display: data.cooperation_level == '2' ? 'inline-block' : 'none', marginTop: 11 }}
                    className={styles.cooperationicon2}></div>
                </Popover>
              </div>
            </div>
            <span className={styles.location} ><i className={"ri-map-pin-2-line"}></i>{data.location}</span>
            <span className={styles.information}><i className={"ri-building-line"}></i>{data.information}</span>
          </div>

          <div className={styles.pricelink}>

            <div className={styles.pricebox}>
              <div className={styles.price}>￥{data.price}</div>
              <div className={styles.pricetext}>起</div>
            </div>
            {/* 查看详情按钮 */}

            {/* <Link href={{ pathname: '/hotel/details?id='}} data-id={item.id}> */}
            <Button type="primary" className={styles.button} href='#part-1' onClick={handleClick}>选择房间</Button>
            {/* </Link> */}

          </div>
        </div>
        <div className={styles.display_page_bottom}>
          <div className={styles.display_page_bottom_left} >

            <Image.PreviewGroup>
              <div className={styles.imageobx}>
                <div className={styles.show_image}>
                  <Image src={data.img_show} />
                </div>
                <div className={styles.image_preview}>
                  {data.img_other && data.img_other.map((src: any, index: number) => (
                    <div className={styles.other_image} key={index}>
                      <Image src={src} />
                    </div>
                  ))}
                </div>
              </div>
            </Image.PreviewGroup>

          </div>
          <div className={styles.display_page_bottom_right}>
            <div className={styles.commentbox}>
              <div className={styles.rate_number}>{data.rating}<div style={{ display: 'inline', fontWeight: 300, fontSize: 16 }}>分</div></div>
              <div style={{ display: data.rating == 4.5 ? 'inline' : 'none' }} className={styles.rating_level}>不错</div>
              <div style={{ display: data.rating == 4.6 ? 'inline' : 'none' }} className={styles.rating_level}>好</div>
              <div style={{ display: data.rating == 4.7 ? 'inline' : 'none' }} className={styles.rating_level}>很好</div>
              <div style={{ display: data.rating == 4.8 ? 'inline' : 'none' }} className={styles.rating_level}>非常好</div>
              <div style={{ display: data.rating == 4.9 ? 'inline' : 'none' }} className={styles.rating_level}>非常棒</div>
              <div style={{ display: data.rating == 5.0 ? 'inline' : 'none' }} className={styles.rating_level}>非常棒</div>
            </div>
            <a rel="stylesheet" href="#part-2" >
              <p className={styles.comment_number} onClick={() =>
                document.querySelector('#part-2')?.scrollIntoView
              }>显示所有{data.comments_number}条评论</p>
            </a>
            <div className={styles.mapbox} style={{ width: '90%', height: '30%', marginLeft: '3%', marginTop: '32px' }}>
              <MapComponent center={markerPosition} markerPosition={markerPosition} hotel_name={data.hotel_name} />
            </div>
          </div>
        </div >
      </Row >
      <Row className={styles.nav} ref={topRef}>
        <Anchor
          affix={false}
          direction="horizontal"
          onClick={handleClick}
          targetOffset={targetOffset}
          getContainer={() => document.querySelector('#content')! as HTMLElement}
          className={styles.Anchor}
          items={[
            {
              key: 'part-1',
              href: '#part-1',
              title: '房间',
            },
            {
              key: 'part-2',
              href: '#part-2',
              title: '点评',
            },
            {
              key: 'part-3',
              href: '#part-3',
              title: '政策',
            },
          ]}
        />
      </Row>

      <Row id='part-1' className={styles.room}>
        <div className={styles.date_form_box}>
          <DatePickerModule onDateRangeChange={handleDateRangeChange} />
          <RoomSelector onRoomCountChange={handleRoomCountChange}
            onGuestCountChange={handleGuestCountChange} />
          <p >{dateRangeDiff} 晚</p>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={data.packageOptions}
          renderItem={(item: any, index) => (
            <List.Item>
              <div className={styles.roomitem}>
                <div className={styles.roomleft}>
                  <div className={styles.room_img}><Image src={'https://dimg04.c-ctrip.com/images/0202k120009tt39v088DA_W_1080_808_R5_D.jpg_.webp'} ></Image></div>
                  <div style={{ color: '#0f294d', fontWeight: '600' }}>{item.name}</div>
                  <div>1张特大床和1张单人床 | 28m² | 有窗 | 禁烟</div>
                </div>
                <div className={styles.roomright}>
                  <div className={styles.roomdetail}>
                    <div className={styles.room_people_num}>
                      <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1442" width="20" height="20">
                        <path d="M722.23744 514.69824c36.94592-48.73728 59.136-111.15008 59.136-179.2256 0-155.8784-116.31104-282.24512-259.78368-282.24512-143.46752 0-259.78368 126.36672-259.78368 282.24512 0 68.07552 22.23104 130.49344 59.17184 179.2256-67.84 22.95808-116.8896 85.2992-116.8896 159.42656l0 112.88576c0 93.50656 77.5168 169.32352 173.17376 169.32352l288.64512 0c95.66208 0 173.184-75.82208 173.184-169.32352l0-112.88576C839.0912 600.00256 790.0416 537.66144 722.23744 514.69824zM319.54944 335.47264c0-124.70784 90.46528-225.80736 202.0352-225.80736 111.57504 0 202.0352 101.0944 202.0352 225.80736 0 124.67712-90.46016 225.77152-202.0352 225.77152C410.01472 561.24416 319.54944 460.14976 319.54944 335.47264zM781.36832 772.86912c0 70.15936-63.45216 127.02208-141.70112 127.02208L403.49696 899.8912c-78.24384 0-141.696-56.8576-141.696-127.02208l0-84.64384c0-59.98592 46.57152-109.99296 108.99456-123.24352 42.53184 33.05472 94.50496 52.70528 150.79424 52.70528 56.28416 0 108.2624-19.65056 150.79424-52.70528 62.4128 13.25056 108.98944 63.2576 108.98944 123.24352L781.37344 772.86912z" fill="#D71718" p-id="1443"></path>
                      </svg>
                      <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1442" width="20" height="20">
                        <path d="M722.23744 514.69824c36.94592-48.73728 59.136-111.15008 59.136-179.2256 0-155.8784-116.31104-282.24512-259.78368-282.24512-143.46752 0-259.78368 126.36672-259.78368 282.24512 0 68.07552 22.23104 130.49344 59.17184 179.2256-67.84 22.95808-116.8896 85.2992-116.8896 159.42656l0 112.88576c0 93.50656 77.5168 169.32352 173.17376 169.32352l288.64512 0c95.66208 0 173.184-75.82208 173.184-169.32352l0-112.88576C839.0912 600.00256 790.0416 537.66144 722.23744 514.69824zM319.54944 335.47264c0-124.70784 90.46528-225.80736 202.0352-225.80736 111.57504 0 202.0352 101.0944 202.0352 225.80736 0 124.67712-90.46016 225.77152-202.0352 225.77152C410.01472 561.24416 319.54944 460.14976 319.54944 335.47264zM781.36832 772.86912c0 70.15936-63.45216 127.02208-141.70112 127.02208L403.49696 899.8912c-78.24384 0-141.696-56.8576-141.696-127.02208l0-84.64384c0-59.98592 46.57152-109.99296 108.99456-123.24352 42.53184 33.05472 94.50496 52.70528 150.79424 52.70528 56.28416 0 108.2624-19.65056 150.79424-52.70528 62.4128 13.25056 108.98944 63.2576 108.98944 123.24352L781.37344 772.86912z" fill="#D71718" p-id="1443"></path>
                      </svg>
                    </div>
                    <div className={`${styles.breakfast} ${styles.pointer}`}>
                      <Popover content={'加餐信息：中式早餐 ￥0.00 / 人'} trigger="hover">
                        无早餐
                      </Popover>
                    </div>
                    <div className={styles.cancellation}>
                      <div className={styles.pointer}>
                        <Popover content={
                          <div style={{ width: 400 }}>订单确认后30分钟内可免费取消。逾期不可取消/修改，若未入住将收取您首晚房费¥269（如用优惠券则以券后支付价为准）。订单需等酒店或供应商确认后生效，订单确认结果以携程短信、邮件或app通知为准，如订单不确认将全额退款至您的付款账户。</div>
                        } trigger="hover">
                          <div>30分钟内免费取消</div>
                        </Popover>
                        <div className={`${styles.breakfast} ${styles.pointer}`}>
                          <Popover content={'预订此房型后可快速确认订单。'} trigger="hover">
                            无早餐
                          </Popover>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: 200, paddingTop: 3 }}>
                      <Popover content={'先住后付款，入住免押金，离店后按授权方式自动结账。'} trigger="hover">
                        <div className={styles.Blink}>闪住</div>
                      </Popover>
                    </div>
                    <div style={{ width: 200, display: 'flex', flexDirection: 'row' }} >
                      <div className={styles.pricedetail1} >
                        均
                      </div>
                      <div className={styles.pricedetail2} >
                        ¥{item.price}
                      </div>
                    </div>
                    <div className={styles.book}>
                      <Button
                        id={item.packageOptionsIndex}
                        style={{ display: item.stock > 0 ? 'inline' : 'none' }}
                        type="primary"
                        className={styles.book_bottom}
                        onClick={() => handleBookButtonClick(item.stock, item.packageOptionsIndex, item.price, item.name)} >
                        预订</Button>
                      <Button style={{ display: item.stock == 0 ? 'inline' : 'none' }}
                        type="primary" className={styles.book_bottom}
                        disabled={true}>售完</Button>
                    </div>
                  </div>

                </div>
              </div>

            </List.Item>
          )}
        />
      </Row>

      <Row id='part-2' className={styles.remark}>

        <div className={styles.remark_head} >
          <div className={styles.remark_head_left}>点评</div>
          <div className={styles.remark_head_right}>{`(${CommentArry.length}条真实住客点评)`}</div>
        </div>

        <List
          style={{ width: '100%', padding: 20 }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5, position: 'bottom', align: 'end'
          }}
          dataSource={CommentArry}
          renderItem={(item: HotelComment, index) => (
            <List.Item
              key={item._id}
              actions={[
                <div style={{ paddingRight: 50 }}>{currentUser?.name === 'admin' || currentUser?._id === item.userId ? <Button danger onClick={async () => {
                  try {
                    const res = await request.delete(`/api/comment?userId=${item.userId}&_id=${item._id}`, {
                    });
                    if (res.success == true) {
                      message.success('评论删除成功')
                      fetchData()
                    } else {
                      message.error('评论删除失败')
                    }
                  } catch (error) {
                    console.error(error);
                    message.error('评论删除失败')
                  };
                }}>删除</Button> : null}</div>

              ]}
            >
              <div className={styles.remarkbox}>
                <div className={styles.remarkbox_left}>
                  <div className={styles.remarkbox_left_namebox}>
                    <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                    <div className={styles.remarkbox_left_name}>{item.userName}</div>
                  </div>
                  <div className={styles.remarkbox_time}>
                    <div>发表于：</div>
                    <div>{new Date(item.createdAt).toLocaleString()}</div>
                  </div>

                </div>
                <div className={styles.remarkbox_right}>{item.comment}</div>
              </div>

            </List.Item>
          )}
        />




      </Row>
      <Row id='part-3' className={styles.policy}>
        <div className={styles.remark_head} >
          <div className={styles.remark_head_left}>酒店政策</div>
        </div>
        <div className={styles.remarkbox} style={{ margin: 10, paddingBottom: 10, borderBottom: "1px solid #dadfe6" }}>
          <div className={styles.remarkbox_left}>
            <div className={styles.remarkbox_left_namebox} style={{ fontSize: 18, color: '#0f294d', fontWeight: '700' }}>
              预订提示
              <div className={styles.remarkbox_left_name}></div>
            </div>
          </div>
          <div className={styles.remarkbox_right}>订单需等酒店或供应商确认后生效，订单确认结果以携程短信、邮件或app通知为准。</div>
        </div>

        <div className={styles.remarkbox} style={{ margin: 10, paddingBottom: 10, borderBottom: "1px solid #dadfe6" }}>
          <div className={styles.remarkbox_left}>
            <div className={styles.remarkbox_left_namebox} style={{ fontSize: 18, color: '#0f294d', fontWeight: '700' }}>
              儿童及加床
              <div className={styles.remarkbox_left_name}></div>
            </div>
          </div>
          <div className={styles.remarkbox_right}>不同房型加床和婴儿床政策不同，请以预订房型内政策为准</div>
        </div>
        <div className={styles.remarkbox} style={{ margin: 10, paddingBottom: 10, borderBottom: "1px solid #dadfe6" }}>
          <div className={styles.remarkbox_left}>
            <div className={styles.remarkbox_left_namebox} style={{ fontSize: 18, color: '#0f294d', fontWeight: '700' }}>
              年龄限制
              <div className={styles.remarkbox_left_name}></div>
            </div>
          </div>
          <div className={styles.remarkbox_right}>不允许18岁以下单独办理入住</div>
        </div>

      </Row>

    </div >


  )
}
