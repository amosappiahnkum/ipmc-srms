import {Col, Form, Input, Row} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddInstructor, handleUpdateInstructor} from "../../actions/instructors/InstructorAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";

function InstructorForm(props) {
    const {addInstructor, updateInstructor} = props

    const {state} = useLocation()

    const formValues = {
        id: 0,
        other_name: '',
        email: '',
        specialization: '',
        ...state.data
    }

    return (
        <TlaFormWrapper
            submitText={'Save Instructor'}
            file={null} width={600}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addInstructor : updateInstructor}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Instructor`}>
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
                <Col span={24} xs={24} md={12}>
                    <Form.Item name="phone_number" label="Phone Number"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Phone Number is Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={12}>
                    <Form.Item name="email" label="Email"
                               rules={[
                                   {
                                       type: "email",
                                       message: "Not a valid Email"
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={24}>
                    <Form.Item name="specialization" label="specialization">
                        <Input.TextArea rows={2} size={'large'}/>
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
        </TlaFormWrapper>
    )
}

InstructorForm.propTypes = {
    addInstructor: PropTypes.func.isRequired,
    updateInstructor: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    addInstructor: (payload) => dispatch(handleAddInstructor(payload)),
    updateInstructor: (payload) => dispatch(handleUpdateInstructor(payload)),
})

export default connect(null, mapDispatchToProps)(InstructorForm)
