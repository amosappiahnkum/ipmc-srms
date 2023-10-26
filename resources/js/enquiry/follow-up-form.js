import {Col, DatePicker, Form, Input, Row, Select} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import TlaFormWrapper from "../commons/tla-form-wrapper";
import dayjs from "dayjs";
import {handleSubmitFeedback, handleUpdateFeedback} from "../actions/enquiry/EnquiryAction";

function FollowUpForm(props) {
    const {state} = useLocation()

    const {addFeedback, updateFeedback} = props

    const [form] = Form.useForm();

    const formValues = {
        id: 0,
        ...state?.data,
        follow_up_date: state?.data?.follow_up_date ? dayjs(state?.data?.follow_up_date) : null,
    }

    return (
        <TlaFormWrapper
            submitText={`${formValues.id === 0 ? 'Submit' : 'Update'}`}
            file={null} customForm={form}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addFeedback : updateFeedback}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Feedback`}>
            <Row gutter={10}>
                <Col span={24} xs={24} md={12}>
                    <Form.Item name="mode" label="mode" rules={[
                        {
                            required: true,
                            message: 'Required'
                        }
                    ]}>
                        <Select showSearch size={'large'}>
                            <Select.Option value={'Phone Call'}>Phone Call</Select.Option>
                            <Select.Option value={'Whatsapp'}>Whatsapp</Select.Option>
                            <Select.Option value={'SMS'}>SMS</Select.Option>
                            <Select.Option value={'Email'}>Email</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={12}>
                    <Form.Item name="follow_up_date" label="Date" rules={[
                        {
                            required: true,
                            message: 'Required'
                        }
                    ]}>
                        <DatePicker className={'!w-full'} format={'YYYY-MM-DD'} size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={24}>
                    <Form.Item name="feedback" label="feedback" rules={[
                        {
                            required: true,
                            message: 'Required'
                        }
                    ]}>
                        <Input.TextArea rows={5}/>
                    </Form.Item>
                </Col>
                <Form.Item
                    hidden name="enquiry_id" label="enquiry_id"
                    rules={[
                        {
                            required: true,
                            message: 'Required'
                        }
                    ]}>
                    <Input size={'large'}/>
                </Form.Item>
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
        </TlaFormWrapper>
    )
}

FollowUpForm.propTypes = {
    addFeedback: PropTypes.func.isRequired,
    updateFeedback: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    addFeedback: (payload) => dispatch(handleSubmitFeedback(payload)),
    updateFeedback: (payload) => dispatch(handleUpdateFeedback(payload))
})

export default connect(null, mapDispatchToProps)(FollowUpForm)
