import { Button, DatePicker, Form, message } from "antd"
import { RangeValue } from 'rc-picker/lib/interface';
import { useRouter } from "next/router"
import StarBox from '@/components/Starbox';
import type { RangePickerProps } from 'antd/es/date-picker';
import styles from './index.module.css';
import { SetStateAction, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { Select } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import request from "@/utils/request";
import { UserContext } from "@/components/Layout";
import OrderForm from "@/components/OrderForm";


export default function Home(_props: any) {
  const user = useContext(UserContext)!
  const router = useRouter()
  const { id, hotel_name, star_number = 0, room_name, location, price, packageOptionsIndex, selectedDateRange, dateRangeDiff = 0, roomCount, guestCount } = router.query
  const [RangeDiff, setDateRangeDiff] = useState<number>(Number(dateRangeDiff)); // 存储时间差
  const defaultValue: RangeValue<Dayjs> | undefined = selectedDateRange ? [dayjs(selectedDateRange[0]), dayjs(selectedDateRange[1])] : undefined;
  const [DateRange, setSelectedDateRange] = useState<RangeValue<Dayjs> | undefined>(defaultValue);
  const [roomNum, setRoomNum] = useState<number>(Number(roomCount));

  // 当selectedDateRange成功获取后，对setSelectedDateRange赋初值
  useEffect(() => {
    if (selectedDateRange) {
      const convertedValue: RangeValue<Dayjs> = [
        dayjs(selectedDateRange[0]),
        dayjs(selectedDateRange[1]),
      ];
      setSelectedDateRange(convertedValue);
    }
  }, [selectedDateRange]);

  // 在页面中使用这些参数
  return (
    <>
      <div className={styles.body}>
        <div className={styles.order_left}>
          <OrderForm
            user={user}
            id={id}
            DateRange={DateRange}
            RangeDiff={RangeDiff}
            setSelectedDateRange={setSelectedDateRange}
            setDateRangeDiff={setDateRangeDiff}
            defaultValue={defaultValue}
            roomNum={roomNum}
            setRoomNum={setRoomNum}
            star_number={star_number}
            packageOptionsIndex={packageOptionsIndex}
            roomCount={roomCount}
            room_name={room_name}
            hotel_name={hotel_name}
            location={location}
            price={price}
          />
        </div>
        <div className={styles.order_right}>
          <div className={styles.order_right_price}>
            <div className={styles.pricecount}>
              <div>{roomNum}间 × {RangeDiff}晚</div>
              <div>¥{Number(price) * roomNum * RangeDiff}</div>
            </div>
            <div className={styles.pricecount_bottom}>
              <div className={styles.pricecount_text}>应付总额</div>
              <div className={styles.payment_money}>¥{Number(price) * roomNum * RangeDiff}</div>
            </div>
          </div>
          <div className={styles.order_right_cancellation}>
            <div className={styles.order_right_cancellation_title}>限时取消</div>
            <div className={styles.order_right_cancellation_text}>入住当天18:00前可免费取消修改。逾期不可取消/修改，若未入住将收取您首晚房费¥307（如用优惠券则以券后支付价为准）。订单需等酒店或供应商确认后生效，订单确认结果以携程短信、邮件或app通知为准，如订单不确认将全额退款至您的付款账户。</div>
          </div>

          <div className={styles.order_right_cancellation}>
            <div className={styles.order_right_cancellation_title}>说明</div>
            <div className={styles.order_right_cancellation_text}>预订服务由携程旗下上海赫程国际旅行社有限公司及其分公司提供、住宿服务由酒店提供，交易款项由商家委托携程旗下子公司统一收取。</div>
          </div>
          <div style={{ textAlign: 'center', color: '#2681ff', textDecoration: 'underline', marginTop: '20PX', }}>
            <a href="https://contents.ctrip.com/activitysetupapp/mkt/index/pc">携程专业服务 全程保障</a>
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {}
  };
}