async function convertToCoordinates(address: string) {
    return new Promise<{ lat: number, lng: number }>((resolve, reject) => {
        const getCoordinates = async () => {
            const BMap = await window.BMapGL;
            const geocoder = new BMap.Geocoder();
            geocoder.getPoint(address, function (point) {
                if (point) {
                    const center = {
                        lat: point.lat,
                        lng: point.lng
                    };
                    resolve(center);
                } else {
                    reject(new Error('Failed to convert address to coordinates'));
                }
            }, "上海市");
        };
        getCoordinates();
    });
}

export default convertToCoordinates;