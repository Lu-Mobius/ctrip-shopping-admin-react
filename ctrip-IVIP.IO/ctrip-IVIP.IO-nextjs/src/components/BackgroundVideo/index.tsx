import React from 'react'
import ReactPlayer from 'react-player'
import styles from "./index.module.css";
const BackgroundVideo = () => {
    return (
        <div className="background-video">
            <ReactPlayer
                url="https://s.qunarzz.com/finance/finance_primary_rn/primary/financeVideoPC.mp4"
                playing
                loop
                muted
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
            />
        </div>
    )
}

export default BackgroundVideo