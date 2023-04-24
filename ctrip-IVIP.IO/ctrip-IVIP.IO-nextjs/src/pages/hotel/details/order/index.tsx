import { Button, Col, DatePicker, Form, Row, TimePicker, message } from "antd"
import { RangeValue } from 'rc-picker/lib/interface';
import { useRouter } from "next/router"
import StarBox from '@/components/Starbox';
import type { RangePickerProps } from 'antd/es/date-picker';
import styles from './index.module.css';
import { DatePickerModule } from "@/components/DatePicker";
import { SetStateAction, useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { Select } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Link from "next/link";
import { postOrder } from "@/api/hotel";
import request from "@/utils/request";


export default function Home() {


  const router = useRouter()
  const { id, hotel_name, star_number = 0, room_name, location, price, packageOptionsIndex, selectedDateRange, dateRangeDiff = 0, roomCount, guestCount } = router.query
  const { RangePicker } = DatePicker;
  const defaultValue: RangeValue<Dayjs> | undefined = selectedDateRange ? [dayjs(selectedDateRange[0]), dayjs(selectedDateRange[1])] : undefined;
  const [DateRange, setSelectedDateRange] = useState<RangeValue<Dayjs> | undefined>(defaultValue);
  const [RangeDiff, setDateRangeDiff] = useState<number>(Number(dateRangeDiff)); // 存储时间差
  console.log("🚀 ~ file: index.tsx:29 ~ Home ~ RangeDiff:", RangeDiff)

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


  // 定义了三个回调函数，从子组件获取状态
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


  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const { Option } = Select;
  const [roomNum, setRoomNum] = useState<number>(Number(roomCount));
  console.log("🚀 ~ file: index.tsx:53 ~ Home ~ roomNum:", roomNum)

  const handleRoomCountChange = (value: number) => {
    setRoomNum(value);
  }

  const [form] = Form.useForm();

  function getTimeOptions() {
    const timeFormat = 'HH:mm';
    const now = moment();
    const tomorrow = moment().add(1, 'day').startOf('day');
    const startTime = moment().startOf('hour').add(1, 'hour');
    const endTime = tomorrow.clone().add(7, 'hour');
    const timeOptions = [];

    for (let time = startTime.clone(); time.isBefore(endTime); time.add(1, 'hour')) {
      timeOptions.push({
        value: time.format(timeFormat),
        label: time.format(timeFormat),
      });
    }

    return timeOptions;
  }

  const onFinish = (values: any) => {
    form.validateFields().then(async () => {
      values.hotelId = id
      values.packageOptionsIndex = Number(packageOptionsIndex)
      values.quantity = roomNum

      const dateStringArray = DateRange ? DateRange.map(DateRange => dayjs(DateRange).format('YYYY-MM-DD')) : [];
      values.DateRange = dateStringArray ? dateStringArray : '';
      console.log("🚀 ~ file: index.tsx:95 ~ form.validateFields ~ DateRange:", values.DateRange)
      values.RangeDiff = RangeDiff
      values.location = location
      values.residents = values.residents0
      const userStr = localStorage.getItem("user");


      if (userStr) {
        const user = JSON.parse(userStr);
        const userId = user._id;
        values.userId = userId;
        console.log("🚀 ~ file: index.tsx:108 ~ form.validateFields ~ values:", values)
        // const res: any = await postOrder(values)
        const res = await request.post('/api/order', values);
        console.log("🚀 ~ file: index.tsx:113 ~ form.validateFields ~ res:", res)
        if (res.success) {
          router.push({
            pathname: '/hotel/details/order/confirm',
            query: {
              userId: userId,
              orderId: res.orderId,
              hotel_name: hotel_name,
              location: location,
              room_name: room_name,
              price: price,
              DateRange: dateStringArray,
              dateRangeDiff: RangeDiff,
              roomCount: roomCount,
            }
          });
        } else {
          message.success("创建订单失败，请重试")
        }

      } else {
        message.success("未登录");
        router.push('/login')
      }
    })
  }

  const [time, setTime] = useState('');

  const handleTimeChange = (value: SetStateAction<string>) => {
    setTime(value);
  };

  function handleBackClick() {
    router.back();
  }

  // 在页面中使用这些参数
  return (
    <>
      <div className={styles.body}>
        <div className={styles.order_left}>
          <Form form={form} onFinish={onFinish}>
            <div className={styles.titlebox}>
              <div className={styles.hotel_name_box}>
                <div className={styles.hotel_name}>{hotel_name}</div>
                <StarBox count={Number(star_number)} />
              </div>
              <div className={styles.location}>
                <div><svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="982" width="20" height="20"><path d="M511.318478 54.973032c-187.44002 0-339.387687 151.952784-339.387687 339.38871 0 141.897777 282.960537 565.934376 339.387687 565.644781 55.540967 0.289596 339.38871-425.650353 339.38871-565.644781C850.707189 206.925816 698.755428 54.973032 511.318478 54.973032zM511.318478 875.160113c-47.022966 0.240477-282.82239-362.550223-282.82239-480.798371 0-156.198481 126.624932-282.823414 282.82239-282.823414s282.821367 126.624932 282.821367 282.823414C794.139845 511.028882 557.603641 875.40059 511.318478 875.160113zM511.318478 252.950036c-78.099752 0-141.411707 63.311954-141.411707 141.411707 0 78.097706 63.311954 141.411707 141.411707 141.411707 78.098729 0 141.410684-63.314001 141.410684-141.411707C652.729162 316.260967 589.417207 252.950036 511.318478 252.950036zM511.318478 479.205083c-46.859237 0-84.847433-37.984103-84.847433-84.84334 0-46.862307 37.988196-84.84641 84.847433-84.84641s84.84641 37.984103 84.84641 84.84641C596.164888 441.222003 558.177716 479.205083 511.318478 479.205083z" fill="#272636" p-id="983"></path></svg></div>{location}</div>
              <div className={styles.roomname}>{room_name}</div>
              <div className={styles.additional_information}>
                <div>
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1213" width="20" height="20"><path d="M800 835.328l-574.496 0.032A2.464 2.464 0 0 1 224 834.656v-118.656c0-5.856 5.92-14.944 12.096-17.44 1.056-0.448 69.408-30.272 149.952-50.464 41.248-10.336 85.632-18.208 125.952-18.208 36.64 0 76.736 6.496 114.816 15.456a1061.6 1061.6 0 0 1 161.856 53.536c5.312 2.176 11.328 11.296 11.328 17.12v119.36zM400.992 326.88A103.136 103.136 0 0 1 504.16 224a103.168 103.168 0 0 1 103.2 102.88v123.104a103.168 103.168 0 0 1-103.2 102.88 103.136 103.136 0 0 1-103.168-102.88v-123.104zM813.728 640c-3.904-1.728-58.56-25.6-129.312-45.76a883.616 883.616 0 0 0-72.608-17.6c36.096-30.592 59.552-75.68 59.552-126.656v-123.104A167.168 167.168 0 0 0 504.192 160c-92.16 0-167.2 74.72-167.2 166.88v123.104c0 52.352 24.768 98.624 62.72 129.28-25.472 5.376-50.112 11.872-72.8 18.656a1098.656 1098.656 0 0 0-115.648 41.664C182.016 651.328 160 684.192 160 716v131.68l1.696 4.992c9.504 27.936 35.136 46.72 63.808 46.72h572.992a65.536 65.536 0 0 0 64.96-56.96l0.544-126.4c0-31.616-21.952-64.416-50.272-76.032z" fill="#3E3A39" p-id="1214"></path></svg>
                  2人
                </div>
                <div>
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1352" width="20" height="20"><path d="M926.935 459.081c0.039-0.856 0.065-1.715 0.065-2.581v-272c0-30.603-24.897-55.5-55.5-55.5h-720c-30.603 0-55.5 24.897-55.5 55.5v272c0 1.075 0.039 2.141 0.099 3.201C77.413 471.719 65 492.68 65 516.5l-1 324c0 30.603 24.897 55.5 55.5 55.5h80c21.812 0 40.716-12.653 49.783-31h524.434c9.066 18.347 27.972 31 49.783 31h80c30.603 0 55.5-24.897 55.5-55.5v-324c0-24.23-12.839-45.51-32.065-57.419zM159 192h705v257h-64V336.5c0-30.603-24.897-55.5-55.5-55.5h-144c-30.603 0-55.5 24.897-55.5 55.5V449h-66V336.5c0-30.603-24.897-55.5-55.5-55.5h-144c-30.603 0-55.5 24.897-55.5 55.5V449h-65V192z m578 257H608V344h129v105z m-321 0H287V344h129v105zM127 833v-98.243c1.816 0.147 3.646 0.243 5.5 0.243H192v98h-65z m641-32H255v-66h513v66z m63 32v-98h60.5c1.514 0 3.011-0.068 4.5-0.167V833h-65z m65-165.5c0 2.481-2.019 4.5-4.5 4.5h-759a4.505 4.505 0 0 1-4.5-4.5v-151c0-2.481 2.019-4.5 4.5-4.5h759c2.481 0 4.5 2.019 4.5 4.5v151z" fill="#080103" p-id="1353"></path></svg>
                  1张大床
                </div>
                <div>
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1073" width="20" height="20"><path d="M64 917.333333h896v-42.666666H64zM128.085333 704h40.896l2.197334-40.341333C181.056 483.328 330.538667 341.333333 512 341.333333c181.418667 0 330.922667 141.994667 340.8 322.325334L855.04 704h40.896c11.776 0 21.418667 9.6 21.418667 21.333333s-9.664 21.333333-21.418667 21.333334H128.085333C116.266667 746.666667 106.666667 737.066667 106.666667 725.333333s9.621333-21.333333 21.418666-21.333333M512 170.666667a64 64 0 1 1 0 128 64 64 0 0 1 0-128M128.085333 789.333333h767.829334A64.106667 64.106667 0 0 0 960 725.333333c0-35.264-28.693333-64-64.085333-64-10.026667-175.722667-137.92-319.829333-305.749334-354.56A105.984 105.984 0 0 0 618.666667 234.666667a106.666667 106.666667 0 0 0-213.333334 0 106.026667 106.026667 0 0 0 28.757334 72.426666C279.765333 339.861333 161.493333 467.456 132.736 622.144A388.16 388.16 0 0 0 128.576 661.333333C92.8 661.333333 64 689.984 64 725.333333c0 35.264 28.672 64 64.085333 64" fill="#3D3D3D" p-id="1074"></path><path d="M323.285333 521.813333A234.24 234.24 0 0 1 512 426.666667a21.333333 21.333333 0 1 0 0-42.666667 276.949333 276.949333 0 0 0-223.018667 112.426667 21.333333 21.333333 0 0 0 34.304 25.386666" fill="#3D3D3D" p-id="1075"></path></svg>
                  无早餐
                </div>
              </div>
            </div>
            <div className={styles.form}>
              {/* 入住时间部分 */}
              <div className={styles.datebox}>
                <div className={styles.RangePicker_title}>入住时间</div>

                <div style={{ display: "flex", flexDirection: 'row' }}>
                  <RangePicker
                    disabledDate={disabledDate}
                    className={styles.RangePicker}
                    onChange={handleDateRangeChange}
                    defaultValue={defaultValue}
                    style={{ width: '40%' }}
                  />
                  <p >共{RangeDiff} 晚</p>
                  <Select defaultValue={Number(roomCount)} onChange={handleRoomCountChange}>
                    {[...Array(10)].map((_, i) => (
                      <Option key={i + 1} value={i + 1} label={i + 1 as unknown as string}>
                        {i + 1} 间
                      </Option>
                    ))}
                  </Select>
                </div>

              </div>
              <div className={styles.residentsbox}>
                <div className={styles.RangePicker_title}>住客资料</div>

                {Array.from({ length: roomNum }, (_, i) => (
                  <div>
                    <div className={styles.resident_title}>{`房间${i + 1}`}</div>
                    <div>住客姓名</div>
                    <div className={styles.residents_name_box}>
                      <Form.Item
                        name={`residents${i}`}
                        key={i}
                        rules={[
                          {
                            required: true,
                            message: '请输入有效的住客姓名',
                          },
                          {
                            validator: (rule, value) => {
                              if (value) {
                                // 中英文姓名校验正则表达式
                                const regex = /^[\u4e00-\u9fa5]{2,4}|([a-zA-Z]+\s?)*[a-zA-Z]{2,20}$/ || undefined;
                                if (!regex.test(value)) {
                                  return Promise.reject('请输入正确的中英文姓名');
                                }
                              }
                              return Promise.resolve();
                            },
                          }
                        ]}
                      >
                        <Input
                          key={i}
                          bordered={false}
                          className={styles.residents_input_text}
                          placeholder={'每间只需填写一人'}
                          prefix={<UserOutlined className="site-form-item-icon" />}
                          suffix={
                            <Tooltip title="请按实际入住人数填写，姓名与证件保持一致">
                              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>

                          }
                        />
                      </Form.Item>
                    </div>

                  </div>
                ))}


                <div className={styles.residents_name_box}>
                  <div style={{ marginTop: 15 }}>电子邮件（选填）</div>
                  <Form.Item
                    name="email"
                    key={'email'}
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: '请输入有效的电子邮箱',
                      },
                    ]}
                  >
                    <Input
                      key={'email'}
                      bordered={false}
                      placeholder={'电子邮箱'}
                      className={styles.residents_input_text}
                    />
                  </Form.Item>
                </div>
                <div className={styles.residents_name_box}>
                  <div style={{ marginTop: 15 }}>手机号码</div>
                  <Form.Item
                    name="phone"
                    key='phone'
                    rules={[
                      {
                        required: true,
                        pattern: /^1[3456789]\d{9}$/,
                        message: '请输入有效的手机号码',
                      },
                    ]}
                  >
                    <Input
                      key={'phone'}
                      bordered={false}
                      placeholder={'手机号码'}
                      className={styles.residents_input_text}
                    />
                  </Form.Item>
                </div>

              </div>

            </div>
            <div className={styles.residentsbox}>
              <div className={styles.RangePicker_title}>预计到店</div>
              <Form.Item
                name="arrival_time"
                key='arrival_time'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  value={time}
                  onChange={handleTimeChange}
                  className={styles.timeselect}
                >
                  {getTimeOptions().map((option) => (
                    <Option key={option.label} value={option.label} label={option.label}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className={styles.residentsbox}>
              <div className={styles.RangePicker_title}>特别要求</div>
              <div>该酒店不支持填写特殊要求</div>
            </div>

            <div className={styles.paymentbox}>
              <div className={styles.paymentbox_left}>
                <div className={styles.payment_text}>余额支付</div>
                <div className={styles.payment_money}>¥{Number(price) * roomNum * RangeDiff}</div>
              </div>
              <div className={styles.paymentbox_right}>
                <Button className={styles.paybottom} htmlType="submit">去支付</Button>
              </div>
            </div>
            <Button type="link" onClick={handleBackClick} className={styles.backbottom}>{`< 更改我的选择`}</Button>
          </Form>

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

Home.getInitialProps = async () => {
  return {};
};
