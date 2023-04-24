import { useState } from 'react';
import { Button, Popover, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.module.css';


interface RoomAndGuestSelectorProps {
    onRoomCountChange: (count: number) => void;
    onGuestCountChange: (count: number) => void;
}

export default function RoomAndGuestSelector(props: RoomAndGuestSelectorProps) {
    const [roomCount, setRoomCount] = useState(1);
    const [guestCount, setGuestCount] = useState(1);

    const handleRoomAdd = () => {
        setRoomCount(roomCount + 1);
        props.onRoomCountChange(roomCount + 1);
    };

    const handleRoomMinus = () => {
        if (roomCount > 1) {
            setRoomCount(roomCount - 1);
            props.onRoomCountChange(roomCount - 1)
        }
    };

    const handleGuestAdd = () => {
        setGuestCount(guestCount + 1);
        props.onGuestCountChange(guestCount + 1)
    };

    const handleGuestMinus = () => {
        if (guestCount > 1) {
            setGuestCount(guestCount - 1);
            props.onGuestCountChange(guestCount - 1)
        }
    };

    const content = (
        <div className={styles.content}>
            <div>
                <span>房间：</span>
                <Button type="text" size="small" onClick={handleRoomMinus}>-</Button>
                <span>{roomCount}</span>
                <Button type="text" size="small" onClick={handleRoomAdd}>+</Button>
            </div>
            <div>
                <span>人数：</span>
                <Button type="text" size="small" onClick={handleGuestMinus}>-</Button>
                <span>{guestCount}</span>
                <Button type="text" size="small" onClick={handleGuestAdd}>+</Button>
            </div>
        </div>
    );

    return (
        <Popover content={content} trigger="hover" placement="bottom" overlayStyle={{ width: 200 }}>
            <div className={styles.bottom}>
                <Button type='text' >
                    <Space size='large' >
                        <div >房间：{roomCount}，人数：{guestCount}</div>
                        <DownOutlined />
                    </Space>
                </Button>
            </div>
        </Popover>
    );
}
