import React from 'react';
import { Map, APILoader } from '@uiw/react-baidu-map';

const Demo = () => (
    <div style={{ width: '100%', height: '300px', overflow: 'auto' }}>
        <APILoader akay="eYpCTECSntZmw0WyoQ7zFpCRR9cpgHFG">
            <Map center="杭州" />
            <Map center="上海">
                {({ BMap, map, container }) => {
                    return;
                }}
            </Map>
        </APILoader>
    </div>
);

export default Demo;