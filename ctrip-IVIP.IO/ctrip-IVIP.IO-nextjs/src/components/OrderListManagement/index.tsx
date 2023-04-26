import { List, Button, Space, message } from "antd";
import { useRouter } from "next/router";
import request from "@/utils/request";
import styles from "./index.module.css";
import { useDebouncedCallback } from "@/utils/debounce";

interface Props {
    data: any;
    status: number;
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    setStatus: React.Dispatch<React.SetStateAction<number>>;
}
const Home: React.FC<Props> = ({ data, status, setData, setStatus }) => {
    const router = useRouter();

    const handleDeleteClick = async (item: any) => {
        try {
            const res = await request.put(`/api/order/delete/${item._id}`, {});
            message.success("订单已成功删除");
            setStatus(4);
        } catch (error) {
            console.error(error);
        }
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


    const handleStatusChange = (status: number) => {
        if (setStatus) {
            setStatus(status);
        }
    };

    return (
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
                                            <Button
                                                ghost={true}
                                                type="text"
                                                style={{ display: item.status == '2' || item.status == '3' ? 'inline-block' : 'none', color: '#06c' }}
                                                onClick={() => debouncedDeleteOrder(item)
                                                }>订单删除
                                            </Button>
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
                                            <Button type="primary" style={{ display: item.status == '1' ? 'inline-block' : 'none', marginLeft: 20, marginRight: 8, color: 'white' }} onClick={() => debouncedcompleteOrder(item)}>确认收货</Button>
                                            <Button danger type="dashed" style={{ display: item.status == '0' || item.status == '1' ? 'inline-block' : 'none', marginLeft: 20 }} onClick={() => debouncedCancelOrder(item)}>取消订单</Button>
                                        </Space>
                                    </div>
                                </div>
                            </div>
                        ]
                        }
                    />)}
            />
        </div>
    )
}

export default Home