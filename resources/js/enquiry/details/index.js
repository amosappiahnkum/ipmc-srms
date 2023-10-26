import React from 'react'
import {Tabs} from "antd";
import Info from "./info";
import AllFollowUps from "./all-follow-ups";

function EnquiryDetail() {
    const items = [
        {
            key: '1',
            label: 'Details',
            children: <Info/>,
        },
        {
            key: '2',
            label: 'Follow Up',
            children: <AllFollowUps/>,
        }
    ];
    return (
        <div className={'pb-5'}>
            <Tabs defaultActiveKey="1" items={items}/>
        </div>
    )
}

export default EnquiryDetail
