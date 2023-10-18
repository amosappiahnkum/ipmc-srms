import React from 'react'
import {DatePicker, Form} from "antd";
import dayjs from "dayjs";

function DateFilter() {
    const lastMonth = dayjs().month(dayjs().month() - 1)

    const rangePresets = [
        {
            label: 'This Month',
            value: [dayjs().date(1), dayjs().endOf('month')],
        },
        {
            label: 'Last Month',
            value: [lastMonth.date(1), lastMonth.endOf('month')],
        },
        {
            label: 'Yesterday',
            value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')],
        },
        {
            label: 'Last 7 Days',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Last 14 Days',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Last 30 Days',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Last 90 Days',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];

    return (
        <Form.Item name="date" label="Date">
            <DatePicker.RangePicker presets={rangePresets} size={'large'}/>
        </Form.Item>
    )
}

export default DateFilter
