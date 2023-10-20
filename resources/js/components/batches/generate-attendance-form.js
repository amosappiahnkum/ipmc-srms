import {Col, Form, Input, Radio, Row, Select} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleGetAllBatch, handlePrintAttendance} from "../../actions/batches/BatchAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import dayjs from "dayjs";
import AllBatchesFilter from "../../commons/filter/all-batches-filter";

function GenerateAttendanceForm({printAttendance}) {
    const {state} = useLocation()
    const [form] = Form.useForm();
    const formValues = {
        id: 0,
        ...state.data,
        month: dayjs().format('M'),
        type: 'weekdays'
    }

    return (
        <TlaFormWrapper
            submitText={'Generate'}
            file={null} customForm={form}
            initialValues={formValues}
            onSubmit={printAttendance}
            formTitle={'Generate Attendance'}>
            <Row gutter={10}>
                <Col span={24} xs={24} md={24}>
                    <AllBatchesFilter required/>
                </Col>
                <Col span={24} xs={24} md={24}>
                    <Form.Item hidden name="id" label="id">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item name="month" label="Month">
                        <Select size={'large'} showSearch>
                            <Select.Option value={"1"}>January</Select.Option>
                            <Select.Option value={"2"}>February</Select.Option>
                            <Select.Option value={"3"}>March</Select.Option>
                            <Select.Option value={"4"}>April</Select.Option>
                            <Select.Option value={"5"}>May</Select.Option>
                            <Select.Option value={"6"}>June</Select.Option>
                            <Select.Option value={"7"}>July</Select.Option>
                            <Select.Option value={"8"}>August</Select.Option>
                            <Select.Option value={"9"}>September</Select.Option>
                            <Select.Option value={"10"}>October</Select.Option>
                            <Select.Option value={"11"}>November</Select.Option>
                            <Select.Option value={"12"}>December</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={24}>
                    <Form.Item label="Attendance Type" name={'type'}>
                        <Radio.Group>
                            <Radio value="weekdays"> Weekdays only </Radio>
                            <Radio value="weekends"> Weekends Only </Radio>
                            <Radio value={'both'}> Both </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

GenerateAttendanceForm.propTypes = {
    printAttendance: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    printAttendance: (data) => dispatch(handlePrintAttendance(data)),
    getAllBatches: () => dispatch(handleGetAllBatch())
})

export default connect(null, mapDispatchToProps)(GenerateAttendanceForm)
