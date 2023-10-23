import {Col, Form, Input, Row, Select} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddStaff, handleUpdateStaff} from "../../actions/staff/StaffAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";

function StaffForm(props) {
    const {addStaff, updateStaff} = props

    const {state} = useLocation()

    const formValues = {
        id: 0,
        other_name: '',
        email: '',
        type: 'instructor',
        ...state.data
    }

    return (
        <TlaFormWrapper
            submitText={'Save Staff'}
            file={null} width={600}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addStaff : updateStaff}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Staff`}>
            <Row gutter={10}>
                <Col span={24} xs={24} md={12}>
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
                <Col span={24} xs={24} md={12}>
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
                <Col span={24} xs={24} md={12}>
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
                <Col span={24} xs={24} md={12}>
                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Required'
                        }
                    ]} name="type" label="Staff Role">
                        <Select size={'large'} showSearch>
                            <Select.Option value={'instructor'}>Instructor</Select.Option>
                            <Select.Option value={'administrator'}>Administrator</Select.Option>
                            {/*<Select.Option value={'assistant-administrator'}>Assistant Administrator</Select.Option>*/}
                            <Select.Option value={'counselor'}>Counselor</Select.Option>
                            <Select.Option value={'cashier'}>Cashier</Select.Option>
                        </Select>
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

StaffForm.propTypes = {
    addStaff: PropTypes.func.isRequired,
    updateStaff: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    addStaff: (payload) => dispatch(handleAddStaff(payload)),
    updateStaff: (payload) => dispatch(handleUpdateStaff(payload)),
})

export default connect(null, mapDispatchToProps)(StaffForm)
