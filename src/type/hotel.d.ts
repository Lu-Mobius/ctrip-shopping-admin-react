export interface HotelQueryType {
    hotel_name?: string
    area?: string
    star_number?: number
}

export interface SearchOptionType {
    value: string;
    label: string;
    children?: SearchOptionType[];
}

export interface HotelDetailQueryType {
    id: string | string[] | undefined;
}

export interface HotelDataType {
    id: string | number;
    hotel_name: string;
}

export interface PayQueryType {
    userId: string | string[] | undefined;
    orderId: string | string[] | undefined;

}

export interface HotelComment {
    _id: string;
    hotelId: string;
    userId: string;
    userName: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}