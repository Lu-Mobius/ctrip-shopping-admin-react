import React from 'react'
import { Avatar, Button, List, message } from 'antd';
import styles from './index.module.css';
import { HotelComment } from '@/type/hotel';
import 'remixicon/fonts/remixicon.css';
import { useCurrentUser } from '@/utils/useCurrentUser';
import request from '@/utils/request';

interface CommentListProps {
    CommentArry: HotelComment[];
    currentUser: { name?: string; _id?: string };
    fetchData: () => void;
}

const CommentList: React.FC<CommentListProps> = ({ CommentArry, fetchData }) => {
    const currentUser = useCurrentUser();
    return (
        <List
            style={{ width: '100%', padding: 20 }}
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5, position: 'bottom', align: 'end'
            }}
            dataSource={CommentArry}
            renderItem={(item: HotelComment, index) => (
                <List.Item
                    key={item._id}
                    actions={[
                        <div style={{ paddingRight: 50 }}>{currentUser?.role == 'admin' || currentUser?._id === item.userId ? <Button danger onClick={async () => {
                            try {
                                const res = await request.delete(`/api/comment?userId=${item.userId}&_id=${item._id}`, {
                                });
                                if (res.success == true) {
                                    message.success('评论删除成功')
                                    fetchData()
                                } else {
                                    message.error('评论删除失败')
                                }
                            } catch (error) {
                                console.error(error);
                                message.error('评论删除失败')
                            };
                        }}>删除</Button> : null}</div>
                    ]}
                >
                    <div className={styles.remarkbox}>
                        <div className={styles.remarkbox_left}>
                            <div className={styles.remarkbox_left_namebox}>
                                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                                <div className={styles.remarkbox_left_name}>{item.userName}</div>
                            </div>
                            <div className={styles.remarkbox_time}>
                                <div>发表于：</div>
                                <div>{new Date(item.createdAt).toLocaleString()}</div>
                            </div>
                        </div>
                        <div className={styles.remarkbox_right}>{item.comment}</div>
                    </div>
                </List.Item>
            )}
        />
    )
}
export default CommentList