import {Col, Form, Input, Row} from 'antd'
import React from 'react'

function ContactInfo() {
    return (
        <Row gutter={10}>
            <Col span={24} xs={12} md={8}>
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Required'
                    },
                    {
                        min: 10,
                        message: 'Must be at least 10 digit'
                    }
                ]} name="phone_number" label="Mobile No.1">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={12} md={8}>
                <Form.Item rules={[
                    {
                        min: 10,
                        message: 'Must be at least 10 digit'
                    }
                ]}  name="alt_phone_number" label="Mobile No.2">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={12} md={8}>
                <Form.Item rules={[
                    {
                        type: 'email',
                        message: 'Type a valid email'
                    }
                ]} name="email" label="Email">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={12} md={8}>
                <Form.Item name="house_number" label="House Number">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={12} md={8}>
                <Form.Item name="digital_address" label="Digital Address">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={12} md={8}>
                <Form.Item name="box_address" label="Box Address">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item name="address" label="Address">
                    <Input.TextArea/>
                </Form.Item>
            </Col>
        </Row>
    )
}

export default ContactInfo
