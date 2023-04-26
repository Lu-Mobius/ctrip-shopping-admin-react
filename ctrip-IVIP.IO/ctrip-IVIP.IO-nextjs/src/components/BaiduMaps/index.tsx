import React, { PropsWithChildren, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// 安装react-bmapgl后，需要前往node_modules\react-bmapgl\types\bmapgl\index.d.ts
// ，添加declare module "react-bmapgl"，官网不支持不完善的问题，可以参考
// https://github.com/huiyan-fe/react-bmapgl/issues/60和https://github.com/huiyan-fe/react-bmapgl/issues/55
import styles from "./index.module.css";

interface MapProps {
    center: { lng: number; lat: number };
    zoom: string;
}

interface MarkerProps {
    position: { lng: number; lat: number };
    onClick?: () => void;
}

interface MapComponentProps {
    center: { lng: number; lat: number };
    markerPosition: { lng: number; lat: number };
    width?: number | string;
    hotel_name: string;
}

// 使用 dynamic 进行懒加载，设置 ssr: false 可以防止在服务器端渲染时加载这些组件,不然会报错
const Map: React.ComponentType<PropsWithChildren<MapProps>> = dynamic(
    () => import('react-bmapgl').then((mod) => mod.Map),
    {
        ssr: false,
        loading: () => <p>Loading Map...</p>,
    }
);

const Marker: React.ComponentType<PropsWithChildren<MarkerProps>> = dynamic(
    () => import('react-bmapgl').then((mod) => mod.Marker),
    {
        ssr: false,
        loading: () => <p>Loading Map...</p>,
    }
);

const InfoWindow: React.ComponentType<{
    position: {
        lng: number;
        lat: number;
    };
    visible: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode;
}> = dynamic(
    () => import('react-bmapgl').then((mod) => mod.InfoWindow),
    {
        ssr: false,
        loading: () => <p>Loading Map...</p>,
    }
);

const ScaleControl: React.ComponentType<PropsWithChildren> = dynamic(
    () => import('react-bmapgl').then((mod) => mod.ScaleControl),
    {
        ssr: false,
        loading: () => <p>Loading Map...</p>,
    }
);

const NavigationControl: React.ComponentType<PropsWithChildren> = dynamic(
    () => import('react-bmapgl').then((mod) => mod.NavigationControl),
    {
        ssr: false,
        loading: () => <p>Loading Map...</p>,
    }
);


const MapComponent: React.FC<MapComponentProps> = ({ center = { lng: 31.23, lat: 121.47 }, markerPosition = { lng: 31.23, lat: 121.47 }, width = "100%", hotel_name }) => {

    const [isClient, setIsClient] = useState(false);
    const [showInfoWindow, setShowInfoWindow] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }
    const handleMarkerClick = () => {
        setShowInfoWindow(true);
    };
    const handleInfoWindowClose = () => {
        setShowInfoWindow(false);
    };


    return (
        <div style={{ width }} className={styles.mapbox}>
            <Map center={center} zoom="15" >
                <Marker position={markerPosition} onClick={handleMarkerClick} />
                {/* 使用条件渲染， 只有当 hotel_name 不为空时，才会渲染 InfoWindow 中的内容
                && 是逻辑与运算符，当用于条件语句中时，如果第一个操作数为假，则不会执行第二个操作数，因为整个表达式已经可以确定为假了。*/}
                {hotel_name && (
                    <InfoWindow
                        title="酒店信息"
                        position={markerPosition}
                        visible={showInfoWindow}
                        onClose={handleInfoWindowClose}

                    >
                        <div >{hotel_name}</div>
                    </InfoWindow>
                )}
                <ScaleControl />
                <NavigationControl />
            </Map>
        </div>
    );
};

export default MapComponent;


