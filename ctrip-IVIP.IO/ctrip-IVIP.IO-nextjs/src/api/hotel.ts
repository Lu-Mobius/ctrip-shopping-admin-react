import axios from 'axios'
import qs from 'qs'
import { resolve } from 'path/posix'
import { HotelDetailQueryType, HotelQueryType, PayQueryType } from '@/type/hotel'
import { message } from 'antd';

// export async function getHotelListaxios(params?: HotelQueryType) {
//     // http://127.0.0.1:4523/m1/2574886-0-default/user/list?hotel_name=xxx&area=xxx&star_number=xxx

//     const res = await axios(
//         `http://127.0.0.1:4523/m1/2574886-0-default/user/list?${qs.stringify(params)}`
//     )
//     return res.data
// }


export async function getHotelList(params?: HotelQueryType) {
    try {
        const res = await fetch(
            `http://127.0.0.1:4523/m1/2574886-0-default/user/list?${qs.stringify(params)}`
        )
        const json = await res.json()
        return json
    } catch (err) {
        console.log(err)
    }
}

export async function getHotelDetail(params: HotelDetailQueryType) {
    try {
        const res = await fetch(
            `http://127.0.0.1:4523/m1/2574886-0-default/user/details?${qs.stringify(params)}`
        )
        const json = await res.json()
        return json
    } catch (err) {
        console.log(err)
    }
}


// export async function postOrder(data: any) {
//     try {
//         const response = await axios.post(
//             'http://127.0.0.1:4523/m1/2574886-0-default/api/order/',
//             datatest,
//             {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// }

export async function postOrder(data: any) {
    try {
        const response = await fetch(
            'http://127.0.0.1:4523/m1/2574886-0-default/api/order/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                body: qs.stringify(data)

            });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export async function payQuery(params: PayQueryType) {
    try {
        const res = await fetch(
            `http://127.0.0.1:4523/m1/2574886-0-default/user/list/order?${qs.stringify(params)}`
        )
        const json = await res.json()
        return json
    } catch (err) {
        console.log(err)
    }
}
