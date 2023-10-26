import {Card, Col, DatePicker, Form, Input, Row, Select} from 'antd'
import dayjs from "dayjs";
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddStudent, handleUpdateStudent} from "../../actions/students/StudentAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import {educationalQualifications, idTypes, nationalities} from "../../utils/nationalities";

function StudentForm(props) {
    const {addStudent, updateStudent} = props

    const {state} = useLocation()

    const formValues = {
        id: 0,
        ...state.data,
        dob: state?.data?.info_update?.new_info ? (state?.data?.info_update?.new_info.dob ? dayjs(state?.data?.info_update?.new_info.dob) : null) : (state?.data ? (state?.data.dob ? dayjs(state?.data.dob) : null) : null),
    }

    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    };
    return (
        <TlaFormWrapper
            width={1000}
            file={null}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addStudent : updateStudent}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Student`}>
            <Row gutter={10}>
                <Col span={18}>
                    <Card size={'small'} title={'Personal Information'}>
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
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]} name="id_type" label="National ID Type">
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
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]} name="id_number" label="National ID">
                                    <Input size={'large'}/>
                                </Form.Item>
                            </Col>
                            <Col span={24} xs={24} md={8}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]} name="dob" label="date of birth">
                                    <DatePicker disabledDate={disabledDate} style={{width: '100%'}} size={'large'}/>
                                </Form.Item>
                            </Col>
                            <Col span={24} xs={12} md={8}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]} name="phone_number" label="Mobile No.1">
                                    <Input size={'large'}/>
                                </Form.Item>
                            </Col>
                            <Col span={24} xs={12} md={8}>
                                <Form.Item name="alt_phone_number" label="Mobile No.2">
                                    <Input size={'large'}/>
                                </Form.Item>
                            </Col>
                            <Col span={24} xs={12} md={8}>
                                <Form.Item name="email" label="Email">
                                    <Input size={'large'}/>
                                </Form.Item>
                            </Col>
                            <Col span={24} xs={12} md={8}>
                                <Form.Item name="gender" label="gender">
                                    <Select size={'large'} showSearch>
                                        <Select.Option value={'Male'}>Male</Select.Option>
                                        <Select.Option value={'Female'}>Female</Select.Option>
                                        <Select.Option value={'Rather not say'}>Rather not say</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24} xs={12} md={8}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]} name="nationality" label="Nationality">
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
                            <Col span={24} xs={12} md={8}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]} name="education_qualifications" label="Educational Qualifications">
                                    <Select maxTagCount={'responsive'} mode={'multiple'} size={'large'} showSearch>
                                        {
                                            educationalQualifications.map((type) => (
                                                <Select.Option value={type} key={type}>{type}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="address" label="Address">
                                    <Input.TextArea/>
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
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size={'small'} title={'Sponsor\'s Information'}>
                        <Row gutter={10}>
                            <Col span={24}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]} name="sponsor_name" label="Sponsor's Name">
                                    <Input size={'large'}/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Required'
                                    }
                                ]} name="sponsor_number" label="Sponsor's Number">
                                    <Input size={'large'}/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="sponsor_email" label="Sponsor's Email">
                                    <Input size={'large'}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

StudentForm.propTypes = {
    addStudent: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    addStudent: (payload) => dispatch(handleAddStudent(payload)),
    updateStudent: (payload) => dispatch(handleUpdateStudent(payload)),
})

export default connect(null, mapDispatchToProps)(StudentForm)
