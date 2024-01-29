import {Descriptions} from 'antd'
import React from 'react'
import {useLocation} from "react-router-dom";

function PersonalDetail() {
    const {state} = useLocation()
    const data = state?.data
    return (
        <Descriptions
            gap={50}
            column={{
                xs: 1,
                sm: 2,
                md: 2
            }}>
            <Descriptions.Item label="Name">{data?.name ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Date Of Birth">{data?.dob ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Mobile Number 1">{data?.phone_number ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Mobile Number 2">{data?.alt_phone_number ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Nationality">{data?.nationality ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Email">{data?.email ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="ID Type">{data?.id_type ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="ID Number">{data?.id_number ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Sponsor Name">{data?.sponsor_name ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Sponsor Email">{data?.sponsor_email ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Sponsor Number">{data?.sponsor_number ?? '-'}</Descriptions.Item>
            <Descriptions.Item label="Educational Qualification">{data?.education_qualifications?.toString() ?? '-'}</Descriptions.Item>
        </Descriptions>
    )
}

export default PersonalDetail
