import axios from 'axios'
import qs from 'qs'
import { resolve } from 'path/posix'
import { HotelQueryType } from '@/type/hotel'
import { message } from 'antd';

export async function getHotelListaxios(params?: HotelQueryType) {
    // http://127.0.0.1:4523/m1/2574886-0-default/user/list?hotel_name=xxx&area=xxx&star_number=xxx

    const res = await axios(
        `http://127.0.0.1:4523/m1/2574886-0-default/user/list?${qs.stringify(params)}`
    )
    return res.data
}


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
