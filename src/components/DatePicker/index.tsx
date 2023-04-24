import type { RangePickerProps } from 'antd/es/date-picker';
import { ConfigProvider, DatePicker, Space } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import styles from './index.module.css';
import { useState } from 'react';

export interface DatePickerModuleProps {
    onDateRangeChange: (dateStrings: any) => void;
}

export function DatePickerModule(props: DatePickerModuleProps) {
    const { RangePicker } = DatePicker;
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().startOf('day');
    };

    const handleDateRangeChange = (dates: any, dateStrings: any) => {
        props.onDateRangeChange(dateStrings);
    };

    const range = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }

        const disabledDateTime = () => ({
            disabledHours: () => range(0, 24).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        });

        const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
            if (type === 'start') {
                return {
                    disabledHours: () => range(0, 60).splice(4, 20),
                    disabledMinutes: () => range(30, 60),
                    disabledSeconds: () => [55, 56],
                };
            }
            return {
                disabledHours: () => range(0, 60).splice(20, 4),
                disabledMinutes: () => range(0, 31),
                disabledSeconds: () => [55, 56],
            };
        };

        return result;
    };

    return (<ConfigProvider locale={locale}>
        <RangePicker bordered={false} disabledDate={disabledDate} className={styles.RangePicker} onChange={handleDateRangeChange} />
    </ConfigProvider>)

}