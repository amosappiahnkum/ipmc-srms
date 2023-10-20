import {Card, Col, Descriptions, Form, Input, InputNumber, Row, Select} from 'antd'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {connect, useSelector} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleGetAllBatches} from "../../actions/batches/BatchAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import {handleGetAllPrograms} from "../../actions/programs/ProgramAction";
import {handleEnrollStudent} from "../../actions/students/StudentAction";
import AllProgramsFilter from "../../commons/filter/all-programs-filter";

function EnrollmentForm(props) {
    const [hasProgram, setHasProgram] = useState(false)
    const [selectedBatch, setSelectedBatch] = useState(null)
    const [loading, setLoading] = useState(false)
    const {enrollStudent, getBatches} = props

    const [form] = Form.useForm();

    const batches = useSelector((state) => state.batchReducer.batches.data)
    const {state} = useLocation()

    const formValues = {
        id: 0,
        discount: 0,
        ...state.data,
    }

    return (
        <TlaFormWrapper
            submitText={'Enroll Student'}
            file={null}
            customForm={form}
            initialValues={formValues}
            onSubmit={enrollStudent}
            resourceId={state?.data?.studentId}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Enrollment`}>
            <Row gutter={10}>
                <Col span={24} xs={24} md={12}>
                    <AllProgramsFilter
                        required
                        hasAll={false}
                        callBack={(value) => {
                            setSelectedBatch(null)
                            form.setFieldValue('ongoing_program_id', null)
                            getBatches(new URLSearchParams(`program_id=${value}`)).then(() => {
                                setHasProgram(true)
                                setLoading(false)
                            })
                        }}/>
                </Col>
                {
                    hasProgram &&
                    <>
                        <Col span={24} xs={24} md={12}>
                            <Form.Item
                                name="ongoing_program_id" label="Batch"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Batch is Required'
                                    }
                                ]}>
                                <Select showSearch size={'large'} loading={loading}
                                        onChange={(value) => {
                                            setSelectedBatch(batches.filter(batch => batch.id === value)[0])
                                        }}>
                                    {
                                        batches.map(({id, batch_time}) => (
                                            <Select.Option value={id} key={id}>{batch_time}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24} xs={24} md={12}>
                            <Form.Item name="discount" label="Discount"
                                       rules={[
                                           {
                                               type: "number",
                                               message: 'Invalid Discount'
                                           }
                                       ]}>
                                <InputNumber className={'!w-full'} min={0}/>
                            </Form.Item>
                        </Col>
                    </>
                }
                <Col span={24}>
                    <Card>
                        <Descriptions gap={50}
                                      layout="vertical"
                                      title="Batch Information"
                                      column={{
                                          xs: 1,
                                          sm: 2,
                                          md: 2
                                      }}>
                            {/*<Descriptions.Item label="Program">{selectedBatch?.program_name ?? '-'}</Descriptions.Item>*/}
                            <Descriptions.Item label="Time">{selectedBatch?.batch_time ?? '-'}</Descriptions.Item>
                            <Descriptions.Item
                                label="Instructor">{selectedBatch?.instructor ?? '-'}</Descriptions.Item>
                            <Descriptions.Item label="Start Date">{selectedBatch?.start_date ?? '-'}</Descriptions.Item>
                            <Descriptions.Item label="End Date">{selectedBatch?.end_date ?? '-'}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <br/>
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

EnrollmentForm.propTypes = {
    enrollStudent: PropTypes.func.isRequired,
    getPrograms: PropTypes.func.isRequired,
    getBatches: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    enrollStudent: (payload, studentId) => dispatch(handleEnrollStudent(payload, studentId)),
    getPrograms: (params) => dispatch(handleGetAllPrograms(params)),
    getBatches: (params) => dispatch(handleGetAllBatches(params))
})

export default connect(null, mapDispatchToProps)(EnrollmentForm)
