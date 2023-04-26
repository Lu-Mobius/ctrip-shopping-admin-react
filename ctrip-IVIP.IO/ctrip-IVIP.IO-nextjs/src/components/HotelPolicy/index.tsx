import React from 'react';
import styles from './index.module.css';

const HotelPolicy = () => {
    return (
        <>
            <div className={styles.remark_head} >
                <div className={styles.remark_head_left}>酒店政策</div>
            </div>
            <div className={styles.remarkbox} style={{ margin: 10, paddingBottom: 10, borderBottom: "1px solid #dadfe6" }}>
                <div className={styles.remarkbox_left}>
                    <div className={styles.remarkbox_left_namebox} style={{ fontSize: 18, color: '#0f294d', fontWeight: '700' }}>
                        预订提示
                        <div className={styles.remarkbox_left_name}></div>
                    </div>
                </div>
                <div className={styles.remarkbox_right}>订单需等酒店或供应商确认后生效，订单确认结果以携程短信、邮件或app通知为准。</div>
            </div>
            <div className={styles.remarkbox} style={{ margin: 10, paddingBottom: 10, borderBottom: "1px solid #dadfe6" }}>
                <div className={styles.remarkbox_left}>
                    <div className={styles.remarkbox_left_namebox} style={{ fontSize: 18, color: '#0f294d', fontWeight: '700' }}>
                        儿童及加床
                        <div className={styles.remarkbox_left_name}></div>
                    </div>
                </div>
                <div className={styles.remarkbox_right}>不同房型加床和婴儿床政策不同，请以预订房型内政策为准</div>
            </div>
            <div className={styles.remarkbox} style={{ margin: 10, paddingBottom: 10, borderBottom: "1px solid #dadfe6" }}>
                <div className={styles.remarkbox_left}>
                    <div className={styles.remarkbox_left_namebox} style={{ fontSize: 18, color: '#0f294d', fontWeight: '700' }}>
                        年龄限制
                        <div className={styles.remarkbox_left_name}></div>
                    </div>
                </div>
                <div className={styles.remarkbox_right}>不允许18岁以下单独办理入住</div>
            </div>
        </>
    );
};

export default HotelPolicy;