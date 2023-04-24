import { FC } from 'react';

import { List, Image, Popover, Button } from 'antd';
import styles from './index.module.css';
import Link from 'next/link';
import router from 'next/router';
import { HotelListItem } from '@/type/hotel';

interface Props {
    item: HotelListItem;
}

export const HotelVirtualListItem: FC<Props> = ({ item }) => {
    return (
        <>
            <div className={styles.leftbox}>
                <Image className={styles.leftimage} src={item.img_show} />

                <div className={styles.titlebox}>
                    <div className={styles.title}>{item.hotel_name}</div>

                    <div className={styles.starbox} style={{ display: item.star_number > '0' ? 'inline-block' : 'none' }}>
                        <div style={{ display: item.star_number >= '1' ? 'inline-block' : 'none' }} >⭐</div>
                        <div style={{ display: item.star_number >= '2' ? 'inline-block' : 'none' }}>⭐</div>
                        <div style={{ display: item.star_number >= '3' ? 'inline-block' : 'none' }}>⭐</div>
                        <div style={{ display: item.star_number >= '4' ? 'inline-block' : 'none' }}>⭐</div>
                        <div style={{ display: item.star_number >= '5' ? 'inline-block' : 'none' }} >⭐</div>
                    </div>
                    <div className={styles.cooperationbox}>
                        <Popover content={'携程紧密合作酒店/供应商，为携程会员提供优惠房价。'} trigger="hover">
                            <div style={{ display: item.cooperation_level == '1' ? 'inline-block' : 'none' }}
                                className={styles.cooperationicon1}></div>
                        </Popover>
                        <Popover content={'携程战略合作酒店/供应商，拥有优质服务、优良品质及优惠房价。'} trigger="hover">
                            <div style={{ display: item.cooperation_level == '2' ? 'inline-block' : 'none' }}
                                className={styles.cooperationicon2}></div>
                        </Popover>
                    </div>
                </div>

            </div>
            {/* 右边栏 */}
            <div className={styles.rightbox}>
                <div className={styles.scorebox}>
                    <div className={styles.comment_box}>
                        <div style={{ display: item.rating == 4.5 ? 'inline' : 'none' }} className={styles.rating_level}>不错</div>
                        <div style={{ display: item.rating == 4.6 ? 'inline' : 'none' }} className={styles.rating_level}>好</div>
                        <div style={{ display: item.rating == 4.7 ? 'inline' : 'none' }} className={styles.rating_level}>很好</div>
                        <div style={{ display: item.rating == 4.8 ? 'inline' : 'none' }} className={styles.rating_level}>棒</div>
                        <div style={{ display: item.rating == 4.9 ? 'inline' : 'none' }} className={styles.rating_level}>超级棒</div>
                        <div style={{ display: item.rating == 5.0 ? 'inline' : 'none' }} className={styles.rating_level}>超级棒</div>
                        <div className={styles.comment_number}>{item.comments_number}条评论</div>
                    </div>
                    <div className={styles.rate_number}>{item.rating}</div>
                </div>
                {/* 价格 */}
                <Link href={{ pathname: '/hotel/details' }}  >
                    <div className={styles.pricebox}>
                        <div className={styles.price}>￥{item.price}</div>
                        <div className={styles.pricetext}>起</div>
                    </div>
                </Link>
                {/* 查看详情按钮 */}
                <div style={{ marginLeft: 'auto' }}>
                    {/* <Link href={{ pathname: '/hotel/details?id='}} data-id={item.id}> */}
                    <Button type="primary" className={styles.button} onClick={() => {
                        router.push({
                            pathname: '/hotel/details',
                            query: { id: item._id },
                        })
                    }
                    }>查看详情</Button>
                    {/* </Link> */}
                </div>
            </div>
        </>
    )
}