import {Col, Form, Input, Radio, Row} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleGetAllBatch, handlePrintBatchPlan} from "../../actions/batches/BatchAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";

function GenerateBatchPlan({printBatchPlan}) {
    const {state} = useLocation()
    const [form] = Form.useForm();
    const formValues = {
        id: 0,
        ...state.data,
        sem: 1
    }

    return (
        <TlaFormWrapper
            submitText={'Print'}
            file={null} customForm={form}
            initialValues={formValues}
            onSubmit={printBatchPlan}
            formTitle={'Print Batch Plan'}>
            <Row gutter={10}>
                <Col span={24} xs={24} md={24}>
                    <p className={'mb-3'}>{state.data?.name}</p>
                    {/*<AllBatchesFilter callBack={(value) => {
                        setSems(value.sems)
                    }} required self={location?.state?.background?.pathname === '/my-batches'}/>*/}
                    <Form.Item hidden name="batch_id" label="id">
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item hidden name="id" label="id">
                        <Input type="text"/>
                    </Form.Item>
                </Col>
                {
                    state.data?.sems?.length > 0 &&
                    <Col span={24} xs={24} md={24}>
                        <Form.Item label="Semester" name={'sem'}>
                            <Radio.Group>
                                <Radio value={state.data?.sems?.[0]}>Sem {state.data?.sems?.[0]} </Radio>
                                <Radio value={state.data?.sems?.[1]}>Sem {state.data?.sems?.[1]} </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                }

            </Row>
        </TlaFormWrapper>
    )
}

GenerateBatchPlan.propTypes = {
    printBatchPlan: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    printBatchPlan: (data) => dispatch(handlePrintBatchPlan(data)),
    getAllBatches: () => dispatch(handleGetAllBatch())
})

export default connect(null, mapDispatchToProps)(GenerateBatchPlan)
