import {Checkbox, Col, Form, Input, Row, Select} from 'antd'
import React from 'react'
import {heardAboutUs, preferredTimings} from "../utils/nationalities";

function Sponsor() {
    return (
        <div>
            <div>
                <h3 className={'font-bold'}>Sponsor Information</h3>
                <Row gutter={[10, 10]}>
                    <Col span={12} xs={24} md={6}>
                        <Form.Item rules={[
                            {
                                required: true,
                                message: 'Required'
                            }
                        ]} name="sponsor_name" label="Sponsor's Name">
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} md={6}>
                        <Form.Item rules={[
                            {
                                required: true,
                                message: 'Required'
                            }
                        ]} name="sponsor_number" label="Sponsor's Number">
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} md={6}>
                        <Form.Item name="sponsor_email" label="Sponsor's Email">
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} md={6}>
                        <Form.Item name="relationship" label="Relationship">
                            <Select size={'large'} showSearch>
                                <Select.Option value={'Self'}>Self</Select.Option>
                                <Select.Option value={'Parent'}>Parent</Select.Option>
                                <Select.Option value={'Brother'}>Brother</Select.Option>
                                <Select.Option value={'Sister'}>Sister</Select.Option>
                                <Select.Option value={'Guardian'}>Guardian</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'}>
                <div className={'border rounded-lg p-3'}>
                    <h3 className={'font-bold  text-lg mb-2'}>Preferred Course Timings</h3>
                    <Form.Item name="preferred_timings" label="">
                        <Checkbox.Group>
                            <div className={'grid grid-cols-3 gap-2'}>
                                {
                                    preferredTimings.map((time, index) => {
                                        return (
                                            <div key={time} className={`p-2 rounded-lg bg-gray-${index + 1}00`}>
                                                <div className={'flex flex-col'}>
                                                    <Checkbox
                                                        style={{ fontSize: 12, color : (index + 1) > 4 ? '#fff': '#000'}}
                                                        value={time}>
                                                        {time}
                                                    </Checkbox>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Checkbox.Group>
                    </Form.Item>

                    <div>
                        <Form.Item name="other_preferred_timing" label="Any Other (Specify)">
                            <Input size={'large'}/>
                        </Form.Item>
                    </div>
                </div>
                <div className={'border rounded-lg p-3'}>
                    <h3 className={'font-bold text-lg mb-2'}>How did you hear about us</h3>
                    <Form.Item name="heard" label="">
                        <Checkbox.Group>
                            <div className={'grid grid-cols-3 gap-2'}>
                                {
                                    heardAboutUs.map((time, index) => (
                                        <div key={time} className={`p-2 rounded-lg bg-gray-${index + 1}00`}>
                                            <div className={'flex flex-col'}>
                                                <Checkbox
                                                    style={{ fontSize: 12, color : (index + 1) > 4 ? '#fff': '#000'}}
                                                    value={time}>
                                                    {time}
                                                </Checkbox>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </Checkbox.Group>
                    </Form.Item>

                    <div>
                        <div>
                            <Form.Item name="other_heard" label="Any Other (Specify)">
                                <Input size={'large'}/>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sponsor
