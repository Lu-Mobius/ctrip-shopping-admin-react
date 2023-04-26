import { Button, Checkbox } from "antd"
import { useRouter } from "next/router"
import styles from './index.module.css';
import 'moment/locale/zh-cn';
import request from "@/utils/request";
import { useDebouncedCallback } from "@/utils/debounce";

export default function Home() {
  const router = useRouter()

  const { userId = '', orderId = '', hotel_name = '', room_name = '', location = '', price = 0,
    DateRange = [], dateRangeDiff = 0, roomCount = 0, } = router.query
  const totalprice = Number(price) * Number(dateRangeDiff) * Number(roomCount)
  // 返回上一步
  function handleBackClick() {
    router.back();
  }
  // 支付
  async function handlepayClick() {
    try {
      const payResult = await request.put(`/api/order/pay?userId=${userId}&orderId=${orderId}`);
      // 判断支付结果是否成功
      if (payResult.success) {
        // 成功则跳转至其他页面
        router.push('/hotel/success');
      } else {
        router.push('/hotel/failed');
      }
    } catch (error: any) {
      console.error(error);
    }
  }
  const debouncedHandlePayClick = useDebouncedCallback(handlepayClick, 300);

  return (
    <div className={styles.body}>
      <div className={styles.head}>
        <div className={styles.moneybox}>
          <div className={styles.money_title}>订单金额</div>
          <div className={styles.money_symbol}>¥</div>
          <div className={styles.money}>{totalprice}</div>
        </div>
        <div className={styles.titlebox}>
          <div className={styles.hotel_name_box}>
            <div className={styles.hotel_name}>{hotel_name}</div>
          </div>
          <div className={styles.location}>
            <div><svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="982" width="20" height="20"><path d="M511.318478 54.973032c-187.44002 0-339.387687 151.952784-339.387687 339.38871 0 141.897777 282.960537 565.934376 339.387687 565.644781 55.540967 0.289596 339.38871-425.650353 339.38871-565.644781C850.707189 206.925816 698.755428 54.973032 511.318478 54.973032zM511.318478 875.160113c-47.022966 0.240477-282.82239-362.550223-282.82239-480.798371 0-156.198481 126.624932-282.823414 282.82239-282.823414s282.821367 126.624932 282.821367 282.823414C794.139845 511.028882 557.603641 875.40059 511.318478 875.160113zM511.318478 252.950036c-78.099752 0-141.411707 63.311954-141.411707 141.411707 0 78.097706 63.311954 141.411707 141.411707 141.411707 78.098729 0 141.410684-63.314001 141.410684-141.411707C652.729162 316.260967 589.417207 252.950036 511.318478 252.950036zM511.318478 479.205083c-46.859237 0-84.847433-37.984103-84.847433-84.84334 0-46.862307 37.988196-84.84641 84.847433-84.84641s84.84641 37.984103 84.84641 84.84641C596.164888 441.222003 558.177716 479.205083 511.318478 479.205083z" fill="#272636" p-id="983"></path></svg></div>{location}</div>
          <div className={styles.roombox}>
            <span className={styles.roomname}>{room_name}</span>
            <div>{roomCount}间</div>
            <div>入住：{DateRange[0]}</div>
            <div>退房：{DateRange[1]}</div>
            <div>入住：{dateRangeDiff}晚</div>
          </div>
        </div>
      </div>
      <div className={styles.tips}>
        <img src="https://webresource.tripcdn.com/ares2/h5paymentsdk/paymentStatic/2.1.1/default/pcsources/tip-detail.png" className={"order-tip-detai-icon"} width={15}></img>
        <span>入住当天18:00前可免费取消修改。逾期不可取消/修改，若未入住将收取您首晚房费¥{price}（如用优惠券则以券后支付价为准）。订单需等酒店或供应商确认后生效，订单确认结果以携程短信、邮件或app通知为准，如订单不确认将全额退款至您的付款账户。使用礼品卡支付将不再享受返现。</span>
      </div>
      <div className={styles.paybox}>
        <Checkbox checked={true} className={styles.pay}>使用余额支付</Checkbox>
      </div>
      <Button onClick={debouncedHandlePayClick} className={styles.paybottom}>使用余额支付¥{totalprice}</Button>
    </div>
  )
}
