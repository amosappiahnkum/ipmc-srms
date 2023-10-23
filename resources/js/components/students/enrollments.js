import {Space, Table} from 'antd'
import React from 'react'
import {useLocation} from "react-router-dom";

function Enrollments() {
    const {state} = useLocation()
    const data = state?.data?.enrollments
    return (
        <Table scroll={{x: 20}} dataSource={data} pagination={false} rowKey={'id'}>
            <Table.Column title="Program Detail" render={(_, { ongoing_program }) => (
                <Space direction={'vertical'} size={1}>
                    <p><b>Name:</b> {ongoing_program.program}</p>
                    <p><b>Instructor:</b>{ongoing_program.staff}</p>
                    <p><b>Batch Time:</b> {ongoing_program.batch_time}</p>
                    <p><b>Start Date:</b>{ongoing_program.start_date}</p>
                    <p><b>End Date:</b> {ongoing_program.end_date}</p>
                </Space>
            )}/>
            <Table.Column title={'total fee'} dataIndex={'total_course_fee'}/>
            <Table.Column title={'reg. fee'} dataIndex={'registration_fee'}/>
            <Table.Column title={'discounted fee'} dataIndex={'discounted_fee'}/>
            <Table.Column title={'net payable fee'} dataIndex={'net_payable_fee'}/>
        </Table>
    )
}
export default Enrollments
