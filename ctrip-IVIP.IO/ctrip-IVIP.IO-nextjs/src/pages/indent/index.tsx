import request from "@/utils/request";
import { Segmented, message } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import { SegmentedValue } from "antd/es/segmented";
import IndentAvatar from "@/components/IndentAvatar";
import { useCurrentUser } from "@/utils/useCurrentUser";
import { UserContext } from "@/components/Layout";
import { useDebouncedCallback } from "@/utils/debounce";
import OrderListIndent from "@/components/OrderListIndent";

export default function Home({ }) {
    const [data, setData] = useState<any>([])
    const [status, setStatus] = useState<number>(100);
    const [userId, setuserId] = useState<string>();
    const [name, setname] = useState<string>('');
    const [balance, setbalance] = useState<number>(0);
    const [Inputamount, setInputamount] = useState<number>(0);
    // 非空断言 useCurrentUser在为user空的情况下会自动跳转

    const user = useContext(UserContext)!
    console.log("🚀 ~ file: index.tsx:21 ~ Home ~ user:", user)
    useEffect(() => {
        async function fetchData() {

            if (status !== 100) {
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
        fetchData()
    }, [status])

    const handleChargeClick = async () => {
        try {
            const res = await request.put(`/api/indent/recharge?userId=${userId}&amount=${Inputamount}`);
            if (res.success == true) {
                setbalance(Number(res.balance))
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
    const debouncedHandleChargeClick = useDebouncedCallback(handleChargeClick, 300);


    const handleStatusChange = (value?: SegmentedValue) => {
        if (typeof value === "number") {
            setStatus(value);
        } else if (typeof value === "string") {
            setStatus(Number(value));
        }
    };



    return (
        <div className={styles.body} id="container">
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
                <OrderListIndent data={data} status={status} setData={setData} setStatus={setStatus} setbalance={setbalance} userId={userId} />
                <div >
                    <IndentAvatar handleChargeClick={debouncedHandleChargeClick} setInputamount={setInputamount} name={name} balance={balance} />
                </div>
            </div>
        </div >
    )
}

export async function getServerSideProps() {
    return {
        props: {}
    };
}