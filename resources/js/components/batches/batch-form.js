import {Col, DatePicker, Form, Input, Row, Select} from 'antd'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddBatch, handleUpdateBatch} from "../../actions/batches/BatchAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import {handleGetAllStaff} from "../../actions/staff/StaffAction";
import dayjs from "dayjs";
import AllProgramsFilter from "../../commons/filter/all-programs-filter";
import ValidateRole from "../../commons/validate-role";

function BatchForm(props) {
    const [loading, setLoading] = useState(false)
    const {state} = useLocation()
    const programs = useSelector(state => state.programReducer.allPrograms)
    const [endDate, setEndDate] = useState(state?.data?.end_date ? dayjs(state?.data.start_date) : null)
    const [selectedProgram, setSelectedProgram] = useState(state?.data ? programs.find(pro => pro.id === state?.data?.program_id) : null)
    const {addBatch, updateBatch, getStaffs} = props
    const durationsTypes = {
        'Months': 'month',
        'Weeks': 'week'
    }
    const branches = useSelector(state => state.commonReducer.commons.branches)
    const staffs = useSelector((state) => state.staffReducer.staffs.data)
    const [form] = Form.useForm();

    const formValues = {
        id: 0,
        staff_id: null,
        room: null,
        status: 'pending',
        ...state.data,
        start_date: state?.data?.start_date ? dayjs(state?.data.start_date) : null,
        end_date: endDate,
        batch_time: state?.data?.batch_time ? dayjs(state?.data.batch_time, 'H:m') : null,
    }

    return (
        <TlaFormWrapper
            submitText={`${formValues.id === 0 ? 'Create' : 'Update'}`}
            file={null} customForm={form}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addBatch : updateBatch}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Batch`}>
            <Row gutter={10}>
                <Col span={24} xs={24} md={18}>
                    <AllProgramsFilter required findProgram callBack={(va) => {
                        setSelectedProgram(va)
                    }}/>
                </Col>
                <Col span={24} xs={24} md={6}>
                    <Form.Item name="status" label="status">
                        <Select loading={loading} showSearch size={'large'}>
                            <Select.Option value={'pending'}>Pending</Select.Option>
                            <Select.Option value={'current'}>Current</Select.Option>
                            <Select.Option value={'completed'}>Completed</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={12}>
                    <Form.Item name="batch_time" label="batch time">
                        <DatePicker className={'!w-full'} format={'h:mm a'} picker={'time'} size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={12}>
                    <Form.Item name="start_date" label="start date">
                        <DatePicker
                            className={'!w-full'}
                            size={'large'}
                            onChange={(value) => {
                                setEndDate(dayjs(value).add(selectedProgram.duration, durationsTypes[selectedProgram.type]))
                                form.setFieldValue('end_date', dayjs(value).add(selectedProgram.duration, durationsTypes[selectedProgram.type]))
                            }}/>
                    </Form.Item>
                </Col>
                <Col span={12} xs={12} md={12}>
                    <Form.Item name="staff_id" label="Instructor">
                        <Select loading={loading} showSearch size={'large'}
                                onFocus={() => {
                                    if (staffs.length === 0) {
                                        setLoading(true)
                                        getStaffs().then(() => setLoading(false))
                                    }
                                }}>
                            {
                                staffs.map(({id, name}) => (
                                    <Select.Option value={id} key={id}>{name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12} xs={12} md={12}>
                    <Form.Item name="room" label="room">
                        <Select showSearch size={'large'}>
                            <Select.Option value={"1"}>Room 1</Select.Option>
                            <Select.Option value={"2"}>Room 2</Select.Option>
                            <Select.Option value={"3"}>Room 3</Select.Option>
                            <Select.Option value={"4"}>Room 4</Select.Option>
                            <Select.Option value={"5"}>Room 5</Select.Option>
                            <Select.Option value={"6"}>Room 6</Select.Option>
                            <Select.Option value={"7"}>Room 7</Select.Option>
                            <Select.Option value={"8"}>Room 8</Select.Option>
                            <Select.Option value={"9"}>Room 9</Select.Option>
                            <Select.Option value={"10"}>Room 10</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <ValidateRole roles={['super-admin']}>
                    <Col span={24} xs={24} md={12}>
                        <Form.Item
                            name="branch_id"
                            label={'Branch'}
                            rules={[{
                                required: true,
                                message: 'Select a branch'
                            }]}>
                            <Select size={'large'} showSearch>
                                {
                                    branches.map(({id, name}) => (
                                        <Select.Option key={id} value={id}>{name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </ValidateRole>
                <Col span={24} xs={24} md={24} className={'flex gap-3 mb-3'}>
                    <p>Duration: {`${selectedProgram?.duration ?? ''} ${selectedProgram?.type ?? ''}`}</p>
                    <p>End Date: {endDate ? dayjs(endDate).format('YYYY-MM-DD') : ''}</p>

                    <Form.Item hidden name="end_date" label="end_date">
                        <DatePicker/>
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
    getStaffs: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    addBatch: (payload) => dispatch(handleAddBatch(payload)),
    updateBatch: (payload) => dispatch(handleUpdateBatch(payload)),
    getStaffs: (payload) => dispatch(handleGetAllStaff(payload))
})

export default connect(null, mapDispatchToProps)(BatchForm)
