import React, { useContext, useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { Anchor, Breadcrumb, Button, Modal, Popover, Row, Select, Space, message } from 'antd';
import styles from './index.module.css';
import { useRef } from 'react';
import { HotelComment } from '@/type/hotel';
import Link from 'next/link';
import 'remixicon/fonts/remixicon.css';
import { Image } from 'antd';
import { DatePickerModule } from '@/components/DatePicker'
import dayjs from 'dayjs';
import RoomSelector from '@/components/RoomSelector';
import StarBox from '@/components/Starbox';
import request from '@/utils/request';
import MapComponent from '@/components/BaiduMaps';
import convertToCoordinates from '@/utils/AddressToPointMap';
import RoomList from '@/components/RoomList';
import HotelPolicy from '@/components/HotelPolicy';
import CommentList from '@/components/CommentList';
import { UserContext } from '@/components/Layout';

export default function Home({ ssr_data, ssr_commentArr }: { ssr_data: any, ssr_commentArr: Array<HotelComment> }) {

  // 设置锚点滚动偏移量
  const topRef = useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState<number>();
  const user = useContext(UserContext)!

  useEffect(() => {
    if (topRef.current) {
      setTargetOffset(topRef.current?.clientHeight + 7);
    }
  }, [topRef]);


  const [data, setData] = useState(ssr_data)
  console.log("🚀 ~ file: index.tsx:31 ~ Home ~ data:", data)
  const [CommentArry, setCommentArr] = useState(ssr_commentArr)
  console.log("🚀 ~ file: index.tsx:32 ~ Home ~ CommentArry:", CommentArry)

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

  // 定义了三个回调函数，从form获取状态
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

  // 设置点击anchor事件，阻止路由跳转（anchor底层用a标签实现跳转）
  const handleClick = (
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById('part-1');
    targetElement?.scrollIntoView({ behavior: 'smooth' });
  };

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
            <Button type="primary" className={styles.button} onClick={handleClick} >选择房间</Button>
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
            <div className={styles.mapbox} style={{ width: '90%', marginLeft: '3%', marginTop: '0' }}>
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
          <p style={{ marginTop: 4 }}>{dateRangeDiff} 晚</p>
        </div>
        <RoomList data={data.packageOptions} handleBookButtonClick={handleBookButtonClick} />
      </Row>

      <Row id='part-2' className={styles.remark}>
        <div className={styles.remark_head} >
          <div className={styles.remark_head_left}>点评</div>
          <div className={styles.remark_head_right}>{`(${CommentArry.length}条真实住客点评)`}</div>
        </div>
        <CommentList CommentArry={CommentArry} currentUser={user} fetchData={fetchData} />
      </Row>

      <Row id='part-3' className={styles.policy}>
        <HotelPolicy />
      </Row>
    </div >
  )
}

export async function getServerSideProps({ query }: { query: NextRouter['query'] }) {
  const { id } = query
  let ssr_data = {}
  let ssr_commentArr = []
  if (id !== undefined) {
    const res = await request.get(`/api/hotel/details?_id=${id}`)
    ssr_data = res.hoteldetail || {}
    ssr_commentArr = res.comArry || []
  }

  return {
    props: {
      ssr_data,
      ssr_commentArr
    }
  }
}
