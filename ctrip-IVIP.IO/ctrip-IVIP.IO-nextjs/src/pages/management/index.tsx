import { getHotelList } from "@/api/hotel";
import request from "@/utils/request";
import { Affix, Avatar, Cascader, Col, Form, Input, List, Row, Segmented, Select, Space, message } from "antd";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from 'antd';
import styles from "./index.module.css";
import { SegmentedValue } from "antd/es/segmented";
import qs from "qs";
import OrderListManagement from "@/components/OrderListManagement";

export default function Home({ ssr_data }: { ssr_data: Array<object> }) {

    const [data, setData] = useState(ssr_data)
    const [status, setStatus] = useState<number>(100);
    const [form] = Form.useForm()

    useEffect(() => {
        async function fetchData() {
            if (status !== 100) {
                try {
                    const res = await request.get(`/api/management?status=${status}`, {
                    });
                    setData(res.data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                try {
                    const res = await request.get(`/api/management`, {
                    });
                    setData(res.data);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        fetchData()
    }, [status])

    const handleSearchReset = (values: any) => {
        form.resetFields()
    }

    const handleSearchFinish = async (values: any) => {
        try {
            const queryString = qs.stringify(values);
            const res = await request.get(`/api/management?${queryString}`);
            setData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = (value?: SegmentedValue) => {
        if (typeof value === "number") {
            setStatus(value);
        } else if (typeof value === "string") {
            setStatus(Number(value));
        }
    };

    const options: any = [
        {
            value: 'Shanghai',
            label: '上海',
            children: [
                { value: 'baoshan', label: '宝山', },
                { value: 'jiading', label: '嘉定', },
            ],
        },
    ];
    return (
        <div className={styles.body}>
            <div className={styles.tabletitlebox}><div className={styles.tabletitle} >订单管理</div>
                <Form
                    form={form}
                    name="search"
                    onFinish={handleSearchFinish}
                    initialValues={{
                        name: '', area: '', star: undefined
                    }}
                    className={styles.tableform}
                >
                    <Row gutter={30}>
                        <Col span={8}>
                            <Form.Item name="userName" label="用户名称" >
                                <Input placeholder='请输入' allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="hotel_name" label="酒店名称" >
                                <Input placeholder='请输入' allowClear />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                        搜索
                                    </Button>
                                    <Button htmlType="submit" onClick={handleSearchReset} style={{ marginLeft: 30 }}>
                                        清空
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row >
                </Form>
            </div>

            <div className={styles.selector}>
                <Segmented options={[
                    { label: '全部', value: 100 },
                    { label: '未支付', value: 0 },
                    { label: '已支付', value: 1 },
                    { label: '已完成', value: 3 },
                    { label: '已取消', value: 2 },
                    { label: '已删除', value: 4 },

                ]}
                    value={status}
                    onChange={handleStatusChange}
                    block
                />
            </div>

            <OrderListManagement data={data} status={status} setData={setData} setStatus={setStatus} />

        </div >
    )
}

export async function getServerSideProps() {
    const res = await request.get('/api/management');
    console.log("🚀 ~ file: index.tsx:136 ~ getServerSideProps ~ res:", res)
    const ssr_data = res.data;
    return {
        props: { ssr_data },
    };
};
