import {Col, DatePicker, Form, Input, InputNumber, Row, Select, TimePicker} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleScheduleExam} from "../../actions/batches/BatchAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import TlaSelect from "../../commons/tla/TlaSelect";

function ScheduleExam({scheduleExam}) {
    const {state} = useLocation()
    const [form] = Form.useForm();

    const formValues = {
        id: 0,
        duration: '2 hours',
        total_questions: 60,
        ...state.data
    }

    return (
        <TlaFormWrapper
            submitText={'Finish'}
            file={null} customForm={form}
            initialValues={formValues}
            onSubmit={scheduleExam}
            formTitle={'Schedule Exam'}>
            <Row gutter={10}>
                <Col span={24} xs={24} md={24}>
                    <TlaSelect onChange={(value) => {
                        const sub = state.data?.modules.find(item => item.id === value)
                        form.setFieldValue('total_questions', sub.questions < 60 ? sub.questions : 60)
                    }} required label={'Module'} optionKey={'name'} name={'program_module_id'} options={state?.data?.modules}/>
                </Col>
                <Col span={12}>
                    <Form.Item hidden rules={[{required: true, message: 'Required'}]}
                               name={'batch_id'} label={'batch_id'}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item hidden rules={[{required: true, message: 'Required'}]}
                               name={'id'} label={'id'}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item rules={[{required: true, message: 'Required'}]}
                               name={'date'} label={'Date'}>
                        <DatePicker style={{width: '100%'}} size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item rules={[{required: true, message: 'Required'}]}
                               name={'time'} label={'Start Time'}>
                        <TimePicker style={{width: '100%'}} size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        rules={[
                            {required: true, message: 'Required'},
                            { type: 'number', min: 1, message: 'Should be at least 1'}
                        ]}
                        label={'Total Questions'} name={'total_questions'}>
                        <InputNumber min={1} style={{width: '100%'}} size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item rules={[{required: true, message: 'Required'}]}
                               name={'duration'} label={'Duration'}>
                        <Select size={'large'}>
                            <Select.Option value={'30 mins'}>30mins</Select.Option>
                            <Select.Option value={'1 hour'}>1hr</Select.Option>
                            <Select.Option value={'1 hour 30 mins'}>1hr 30mins</Select.Option>
                            <Select.Option value={'2 hours'}>2hrs</Select.Option>
                            <Select.Option value={'2 hours 30 mins'}>2hrs 30mins</Select.Option>
                            <Select.Option value={'3 hours'}>3hrs</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

ScheduleExam.propTypes = {
    scheduleExam: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    scheduleExam: (data) => dispatch(handleScheduleExam(data)),
})

export default connect(null, mapDispatchToProps)(ScheduleExam)
