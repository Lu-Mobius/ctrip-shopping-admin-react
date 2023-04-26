import React from 'react';
import { Affix, Avatar, Button, Input, Space } from 'antd';
import styles from './index.module.css';

interface HomeProps {
    handleChargeClick: () => void;
    setInputamount: (amount: number) => void;
    name: string;
    balance: number;
}

const Home = ({ handleChargeClick, setInputamount, name, balance }: HomeProps) => {
    return (
        <Affix target={() => document.getElementById('container')}>
            <div className={styles.userbox}>
                <div className={styles.username}>
                    <Avatar
                        style={{
                            backgroundColor: '#ddd',
                            color: '#0086f6',
                            fontWeight: 700,
                            fontSize: 20,
                            lineHeight: '28px',
                            fontFamily: '宋体',
                        }}
                    >
                        {name.charAt(0)}
                    </Avatar>
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
                            <Button type="primary" onClick={() => handleChargeClick()}>
                                提交
                            </Button>
                        </Space.Compact>
                    </div>
                </div>
            </div>
        </Affix>
    );
};

export default Home;