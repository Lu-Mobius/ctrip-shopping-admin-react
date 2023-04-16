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