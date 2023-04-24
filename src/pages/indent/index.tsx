import { getHotelList } from "@/api/hotel";
import request from "@/utils/request";
import { Affix, Avatar, Input, List, Segmented, Select, Space, message } from "antd";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from 'antd';
import styles from "./index.module.css";
import { SegmentedValue } from "antd/es/segmented";
import CommentForm from "@/components/CommentForm";

export default function Home() {


    const router = useRouter()
    const [data, setData] = useState<any>([])
    const [status, setStatus] = useState<number>(100);
    const [userId, setuserId] = useState<string>();
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [name, setname] = useState<string>('');
    const [balance, setbalance] = useState<number>(0);
    const [Inputamount, setInputamount] = useState<number>(0);
    console.log("🚀 ~ file: index.tsx:21 ~ Home ~ Inputamount:", Inputamount)

    useEffect(() => {
        async function fetchData() {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                if (status !== 100) {
                    const user = JSON.parse(userStr);
                    const userId = user._id;
                    setname(user.name);
                    setuserId(userId)
                    try {
                        const res = await request.get(`/api/indent?userId=${userId}&status=${status}`, {
                        });
                        setData(res.data);
                        setbalance(res.balance)
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    const user = JSON.parse(userStr);
                    const userId = user._id;
                    setname(user.name);
                    setuserId(userId)
                    try {
                        const res = await request.get(`/api/indent?userId=${userId}`, {
                        });
                        const filteredData = res.data.filter((item: any) => item.status !== 4);
                        setData(filteredData);
                        setbalance(res.balance)
                    } catch (error) {
                        console.error(error);
                    }

                }
            }
            else {
                message.error("未登录");
                router.push('/login')
            }
        }
        fetchData()
    }, [status])



    const handlelinkclick = () => {
        router.push('/hotel/details/');
    };

    const handleChargeClick = async () => {
        try {
            const res = await request.put(`/api/indent/recharge?userId=${userId}&amount=${Inputamount}`);
            console.log("🚀 ~ file: index.tsx:76 ~ handleChargeClick ~ res:", res)
            if (res.success == true) {
                setbalance(Number(res.balance))
                console.log("🚀 ~ file: index.tsx:81 ~ handleChargeClick ~ res.balance:", res.balance)
                message.success('充值成功！')
            } else {
                message.error('充值失败')
            }

            // handle payResult as needed
        } catch (error) {
            // handle error as needed
            console.error(error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowModal = () => {
        setIsModalOpen(true);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };
    const handleStatusChange = (value?: SegmentedValue) => {
        if (typeof value === "number") {
            setStatus(value);
        } else if (typeof value === "string") {
            setStatus(Number(value));
        }
    };
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        // 在这里提交评论表单，处理表单数据等等
        handleCancelModal();
    };

    async function handlePayClickInindent(orderId: string) {
        try {
            // 调用接口
            const payResult = await request.put(`/api/order/pay?userId=${userId}&orderId=${orderId}`);
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

    return (
        <div className={styles.body} ref={setContainer}>
            <div className={styles.tabletitle} >订单查询</div>
            <div className={styles.selector}>
                <Segmented options={[
                    { label: '全部', value: 100 },
                    { label: '未支付', value: 0 },
                    { label: '已支付', value: 1 },
                    { label: '已完成', value: 3 },
                    { label: '已取消', value: 2 },

                ]}
                    value={status}
                    onChange={handleStatusChange}
                    block
                />
            </div>
            <div className={styles.list}>

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
                                                <Button ghost={true} type="text" style={{ display: item.status == '2' || item.status == '3' ? 'inline-block' : 'none', color: '#06c' }} onClick={async () => {
                                                    try {
                                                        const res = await request.put(`/api/order/delete/${item._id}`, {
                                                        });
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
                                                }}>订单删除</Button>
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

                                                <Button key={item._id} type="primary" style={{ display: item.status == '0' ? 'inline-block' : 'none', marginLeft: 28, color: 'white' }} onClick={() => handlePayClickInindent(item._id)}>余额支付</Button>
                                                <Button type="primary" style={{ display: item.status == '1' ? 'inline-block' : 'none', marginLeft: 20, marginRight: 8, color: 'white' }} onClick={async () => {
                                                    try {
                                                        const res = await request.put(`/api/order/finish/${item._id}`, {
                                                        });
                                                        message.success('订单已完成')
                                                        handleStatusChange(3)
                                                    } catch (error) {
                                                        console.error(error);
                                                    };
                                                }}>确认收货</Button>
                                                <Button danger type="dashed" style={{ display: item.status == '0' || item.status == '1' ? 'inline-block' : 'none', marginLeft: 20 }} onClick={async () => {
                                                    try {
                                                        const res = await request.put(`/api/order/cancel/${item._id}`, {
                                                        });
                                                        message.success('订单已成功取消')
                                                        handleStatusChange(2)
                                                    } catch (error) {
                                                        console.error(error);
                                                    };
                                                }}>取消订单</Button>
                                                <Button type="primary" className={styles.comment_button} style={{ display: item.status == '3' ? 'inline-block' : 'none', marginLeft: 20, marginRight: 8, color: 'white' }} onClick={async () => {
                                                    setIsModalOpen(true)
                                                }} >
                                                    <CommentForm open={isModalOpen} onCancel={handleCancelModal} item={item} />
                                                    去评论</Button>
                                            </Space>
                                        </div>
                                    </div>
                                </div>
                            ]
                            }
                        />)}
                />
                <div>
                    <Affix target={() => container}>
                        <div className={styles.userbox}>
                            <div className={styles.username}>
                                <Avatar style={{ backgroundColor: '#ddd', color: '#0086f6', fontWeight: 700, fontSize: 20, lineHeight: '28px', fontFamily: '宋体' }}>{name.charAt(0)}</Avatar>
                                <div className={styles.name}>{name}</div>
                            </div>
                            <div className={styles.balancebox}>
                                <div>账户余额：</div>
                                <div className={styles.balance}>¥{balance}</div>
                            </div>
                            <div className={styles.Rechargebox}>
                                <div>充值：</div>
                                <div>
                                    <Space.Compact style={{ width: '100%' }}>
                                        <Input placeholder="请输入充值的金额" onChange={(e) => setInputamount(Number(e.target.value))} />
                                        <Button type="primary" onClick={() => handleChargeClick()}>提交</Button>
                                    </Space.Compact>
                                </div>
                            </div>

                        </div>
                    </Affix>
                </div>
            </div>
        </div >
    )
}

Home.getInitialProps = async () => {
    return {};
};
