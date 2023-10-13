import {Col, DatePicker, Form, Input, Row, Select} from 'antd'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddBatch, handleUpdateBatch} from "../../actions/batches/BatchAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import {handleGetAllPrograms} from "../../actions/programs/ProgramAction";
import {handleGetAllInstructors} from "../../actions/instructors/InstructorAction";
import dayjs from "dayjs";

function BatchForm(props) {
    const [loading, setLoading] = useState(false)
    const {addBatch, updateBatch, getPrograms, getInstructors} = props

    const programs = useSelector((state) => state.programReducer.programs.data)
    const instructors = useSelector((state) => state.instructorReducer.instructors.data)
    const {state} = useLocation()

    const formValues = {
        id: 0,
        ...state.data,
        start_date: state?.data?.start_date ? dayjs(state?.data.start_date) : null,
        end_date: state?.data?.end_date ? dayjs(state?.data.start_date) : null,
        batch_time: state?.data?.batch_time ? dayjs(state?.data.batch_time, 'HH::mm:ss') : null,
    }

    return (
        <TlaFormWrapper
            submitText={'Create Batch'}
            file={null} width={600}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addBatch : updateBatch}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Batch`}>
            <Row gutter={10}>
                <Col span={24} xs={24} md={12}>
                    <Form.Item name="program_id" label="Program"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Program is Required'
                                   }
                               ]}>
                        <Select showSearch size={'large'} loading={loading}
                                onFocus={() => {
                                    if (programs.length === 0) {
                                        setLoading(true)
                                        getPrograms().then(() => setLoading(false))
                                    }
                                }}>
                            {
                                programs.map(({id, name}) => (
                                    <Select.Option value={id} key={id}>{name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={12}>
                    <Form.Item name="instructor_id" label="instructor" loading={loading}>
                        <Select showSearch size={'large'}
                                onFocus={() => {
                                    if (instructors.length === 0) {
                                        setLoading(true)
                                        getInstructors().then(() => setLoading(false))
                                    }
                                }}>
                            {
                                instructors.map(({id, name}) => (
                                    <Select.Option value={id} key={id}>{name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={8}>
                    <Form.Item name="batch_time" label="batch time">
                        <DatePicker picker={'time'} size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={8}>
                    <Form.Item name="start_date" label="start date"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Start Date is Required'
                                   }
                               ]}>
                        <DatePicker size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={8}>
                    <Form.Item name="end_date" label="end date"
                               rules={[
                                   {
                                       required: true,
                                       message: 'End Date is Required'
                                   }
                               ]}>
                        <DatePicker size={'large'}/>
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

BatchForm.propTypes = {
    addBatch: PropTypes.func.isRequired,
    updateBatch: PropTypes.func.isRequired,
    getPrograms: PropTypes.func.isRequired,
    getInstructors: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    addBatch: (payload) => dispatch(handleAddBatch(payload)),
    updateBatch: (payload) => dispatch(handleUpdateBatch(payload)),
    getPrograms: (payload) => dispatch(handleGetAllPrograms(payload)),
    getInstructors: (payload) => dispatch(handleGetAllInstructors(payload))
})

export default connect(null, mapDispatchToProps)(BatchForm)
