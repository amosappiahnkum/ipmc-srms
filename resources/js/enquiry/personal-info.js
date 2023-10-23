import {Col, DatePicker, Form, Input, Row, Select} from 'antd'
import React from 'react'
import {educationalQualifications, idTypes, nationalities} from "../utils/nationalities";

function PersonalInfo() {
    return (
        <Row gutter={10}>
            <Col span={24} xs={24} md={8}>
                <Form.Item name="first_name" label="First Name"
                           rules={[
                               {
                                   required: true,
                                   message: 'First Name is Required'
                               }
                           ]}>
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={24} md={8}>
                <Form.Item name="last_name" label="Last Name"
                           rules={[
                               {
                                   required: true,
                                   message: 'Last Name is Required'
                               }
                           ]}>
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={24} md={8}>
                <Form.Item name="other_name" label="Other Name">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={12} md={8}>
                <Form.Item name="id_type" label="National ID Type">
                    <Select size={'large'} showSearch>
                        {
                            idTypes.map((type) => (
                                <Select.Option value={type} key={type}>{type}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col span={24} xs={12} md={8}>
                <Form.Item name="id_number" label="National ID">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={24} md={8}>
                <Form.Item name="dob" label="Date of birth">
                    <DatePicker style={{width: '100%'}} size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={12} md={8}>
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Required'
                    }
                ]} name="gender" label="Gender">
                    <Select size={'large'} showSearch>
                        <Select.Option value={'Male'}>Male</Select.Option>
                        <Select.Option value={'Female'}>Female</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={24} xs={12} md={8}>
                <Form.Item name="country" label="Country">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={24} xs={24} md={8}>
                <Form.Item name="nationality" label="Nationality">
                    <Select size={'large'} placeholder="Select Nationality" allowClear showSearch>
                        {
                            nationalities.map((nationality) => {
                                return Object.keys(nationality).map((initial) => {
                                    return (
                                        <Select.OptGroup key={initial} label={initial}>
                                            {
                                                Object.keys(nationality[initial]).map((country) => {
                                                    return (
                                                        <Select.Option
                                                            key={country + initial}
                                                            value={nationality[initial][country]}>
                                                            {nationality[initial][country]}
                                                        </Select.Option>
                                                    )
                                                })
                                            }
                                        </Select.OptGroup>
                                    )
                                })
                            })
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col span={24} xs={24} md={8}>
                <Form.Item name="school_name" label="School Name/Institution Studied">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Col span={16} xs={24} md={16}>
                <Form.Item name="education_qualifications" label="Educational Qualifications (You can select multiple)">
                    <Select maxTagCount={'responsive'} mode={'multiple'} size={'large'} showSearch>
                        {
                            educationalQualifications.map((type) => (
                                <Select.Option value={type} key={type}>{type}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col span={24} xs={24} md={24}>
                <Form.Item name="other_qualification" label="Any Other Qualification (Specify)">
                    <Input size={'large'}/>
                </Form.Item>
            </Col>
            <Form.Item
                hidden name="id" label="ID"
                rules={[
                    {
                        required: true,
                        message: 'Required'
                    }
                ]}>
                <Input size={'large'}/>
            </Form.Item>
        </Row>
    )
}
export default PersonalInfo
