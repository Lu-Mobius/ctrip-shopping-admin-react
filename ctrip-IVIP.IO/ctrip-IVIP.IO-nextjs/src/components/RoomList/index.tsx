import React from 'react'
import { Button, List, Popover } from 'antd';
import styles from './index.module.css';

import { Image } from 'antd';

interface Props {
    data: any;
    handleBookButtonClick: any
}

const Home: React.FC<Props> = ({ data, handleBookButtonClick }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
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
    )

}
export default Home;