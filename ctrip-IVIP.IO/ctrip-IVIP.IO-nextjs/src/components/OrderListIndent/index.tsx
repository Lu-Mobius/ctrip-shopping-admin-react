import { List, Button, Space, message } from "antd";
import { useRouter } from "next/router";
import request from "@/utils/request";
import styles from "./index.module.css";
import CommentForm from "../CommentForm";
import { useState } from "react";
import { useDebouncedCallback } from "@/utils/debounce";

interface Props {
    data: any;
    status: number;
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    setStatus: React.Dispatch<React.SetStateAction<number>>;
    setbalance: React.Dispatch<React.SetStateAction<number>>;
    userId: string | undefined;
}
const Home: React.FC<Props> = ({ data, status, setData, setStatus, setbalance, userId }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log("🚀 ~ file: index.tsx:20 ~ isModalOpen:", isModalOpen)

    const handleStatusChange = (status: number) => {
        if (setStatus) {
            setStatus(status);
        }
    };
    const onCancel = () => {
        console.log('111')
        setIsModalOpen(false)
        console.log('111')
    };

    const handlePayClick = async (item: any) => {
        try {
            // 调用接口
            const payResult = await request.put(`/api/order/pay?userId=${userId}&orderId=${item._id}`);
            // 判断支付结果是否成功
            if (payResult.success) {
                // 成功则跳转至其他页面
                message.success('支付成功')
                handleStatusChange(1)
            } else {
                // 失败则提示错误信息
                message.success('支付失败，请及时充值')
            }
        } catch (error: any) {
            console.error(error);
            if (error.response && error.response.status === 500) {
                router.push('/hotel/failed');
            } else {
                alert('支付失败，请稍后再试');
            }
        }
    }
    const debouncedPayOrder = useDebouncedCallback(handlePayClick, 500);


    const handleDeleteClick = async (item: any) => {
        try {
            const res = await request.put(`/api/order/delete/${item._id}`, {});
            message.success('订单已成功删除')
            // 如果订单状态为100，setStatus(100)不会重新发送请求，所以手动重新发送请求
            if (status == 100) {
                const response = await request.get(`/api/indent?userId=${userId}`, {});
                const filteredData = response.data.filter((item: any) => item.status !== 4);
                setData(filteredData);
                setbalance(response.balance)
            } else {
                setStatus(100)
            }
        } catch (error) {
            console.error(error);
        };
    }
    const debouncedDeleteOrder = useDebouncedCallback(handleDeleteClick, 500);


    const handlecompleteClick = async (item: any) => {
        try {
            const res = await request.put(`/api/order/finish/${item._id}`, {
            });
            message.success('订单已完成')
            handleStatusChange(3)
        } catch (error) {
            console.error(error);
        };
    }
    const debouncedcompleteOrder = useDebouncedCallback(handlecompleteClick, 500);

    const handleCancelClick = async (item: any) => {
        try {
            const res = await request.put(`/api/order/cancel/${item._id}`, {
            });
            message.success('订单已成功取消')
            handleStatusChange(2)
        } catch (error) {
            console.error(error);
        };
    }
    const debouncedCancelOrder = useDebouncedCallback(handleCancelClick, 500);


    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
                showTotal: (total, range) => `第${range[0]}-${range[1]}条订单 共 ${total} 条`,
                showSizeChanger: false,
            }}
            dataSource={data}


            renderItem={(item: any) => (
                <List.Item
                    key={item.title}
                    actions={[
                        <div className={styles.indentbox} >
                            <div className={styles.indent}>
                                <div className={styles.head}>
                                    <Space size='large'>
                                        <div>订单号:{item._id}</div>
                                        <div>下单时间：{new Date(item.createdAt).toLocaleString()}</div>
                                        <Button ghost={true} type="text" style={{ display: item.status == '2' || item.status == '3' ? 'inline-block' : 'none', color: '#06c' }}
                                            onClick={() => debouncedDeleteOrder(item)}>订单删除</Button>
                                    </Space>
                                </div>
                                <div className={styles.indent_body}>
                                    <div className={styles.text}>
                                        <div className={styles.hotel_name}>{item.hotel_name}</div>
                                        <div>入住时间：{item.DateRange[0]} 至{item.DateRange[1]} {item.RangeDiff}晚/{item.quantity}间</div>
                                        <div>{item.location}</div>
                                        <div>创建用户：{item.userName}</div>
                                        <div>入住人：{item.residents}等</div>
                                        <div>{item.packageOptionName}</div>
                                    </div>
                                    <div className={styles.money_box}>
                                        <div style={{ display: item.status == '0' ? 'inline-block' : 'none', color: 'red' }} className={styles.state}> 未支付</div>
                                        <div style={{ display: item.status == '1' ? 'inline-block' : 'none', color: '#2477e3' }} className={styles.state}>已支付</div>
                                        <div style={{ display: item.status == '2' ? 'inline-block' : 'none', color: 'rgb(170, 170, 170)' }} className={styles.state}>已取消</div>
                                        <div style={{ display: item.status == '3' ? 'inline-block' : 'none', color: 'green' }} className={styles.state}>已完成</div>
                                        <div style={{ display: item.status == '4' ? 'inline-block' : 'none', color: 'black' }} className={styles.state}>已删除</div>
                                        <div className={styles.money}>
                                            <div>余额付</div>
                                            <div className={styles.totalPrice}>¥{item.totalPrice}</div>
                                        </div>

                                    </div>
                                </div>
                                <div className={styles.bottom}>

                                    <Space>
                                        <Button style={{ display: 'inline-block' }} type="dashed" onClick={() => {
                                            router.push(`/hotel/details?id=${item.hotelId}`);
                                        }} >酒店详情</Button>
                                        <Button style={{ display: 'inline-block' }} type="dashed" onClick={() => {
                                            router.push(`/hotel/details?id=${item.hotelId}`);
                                        }}>再次预定</Button>

                                        <Button key={item._id} type="primary" style={{ display: item.status == '0' ? 'inline-block' : 'none', marginLeft: 28, color: 'white' }} onClick={() => debouncedPayOrder(item)}>余额支付</Button>
                                        <Button type="primary" style={{ display: item.status == '1' ? 'inline-block' : 'none', marginLeft: 20, marginRight: 8, color: 'white' }} onClick={() => debouncedcompleteOrder(item)}>确认收货</Button>
                                        <Button danger type="dashed" style={{ display: item.status == '0' || item.status == '1' ? 'inline-block' : 'none', marginLeft: 20 }} onClick={() => debouncedCancelOrder(item)}>取消订单</Button>
                                        <Button type="primary" className={styles.comment_button} style={{ display: item.status == '3' ? 'inline-block' : 'none', marginLeft: 20, marginRight: 8, color: 'white' }} onClick={() => {
                                            setIsModalOpen(true)
                                        }} > 去评论</Button>
                                        <CommentForm open={isModalOpen} onCancel={onCancel} item={item} />

                                    </Space>
                                </div>
                            </div>
                        </div>
                    ]
                    }
                />)}
        />
    )
}
export default Home;