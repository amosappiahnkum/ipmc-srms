import {Button, Col, Form, Input, InputNumber, Row, Select} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {handleAddProgram, handleUpdateProgram} from "../../actions/programs/ProgramAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import {FiPlus, FiTrash} from "react-icons/fi";

function ProgramForm(props) {
    const {addProgram, updateProgram} = props

    const {state} = useLocation()

    const formValues = {
        id: 0,
        ...state.data
    }

    return (
        <TlaFormWrapper
            raw
            submitText={'Save'}
            file={null} width={900}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addProgram : updateProgram}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Program`}>
            <Row gutter={10}>
                <Col span={24} xs={24} md={16}>
                    <Form.Item name="name" label="Name"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Name is Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24} xs={12} md={4}>
                    <Form.Item name="duration" label="duration(In-Weeks)"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Duration is Required'
                                   }
                               ]}>
                        <InputNumber className={'!w-full'} min={1} size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24} xs={12} md={4}>
                    <Form.Item
                        name="fee" label="fee"
                        rules={[
                            {
                                required: true,
                                message: 'Fee is Required'
                            }
                        ]}>
                        <InputNumber className={'!w-full'} min={1} size={'large'}/>
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
                {/*<Col span={24}>
                    <Form.List name="subjects">
                        {(fields, {add, remove}) => (
                            <>
                                <div className={'flex justify-between items-center mb-2'}>
                                    <h3 className={'text-sm font-medium'}>Modules</h3>
                                </div>
                                {fields.map(({key, name, ...restField}) => (
                                    <div key={key} className={'flex gap-2'}>
                                        <div className={'flex justify-start flex-wrap gap-x-2 w-full'}>
                                            <Form.Item className={'w-1/2 md:w-3/12'}
                                                       {...restField}
                                                       name={[name, 'year']}
                                                       rules={[
                                                           {
                                                               required: true,
                                                               message: 'Required'
                                                           }
                                                       ]}>
                                                <Select className={'w-1/2 md:w-3/12'} size={'large'} placeholder={'Year'}>
                                                    <Select.Option value={1}>Year 1</Select.Option>
                                                    <Select.Option value={2}>Year 2</Select.Option>
                                                    <Select.Option value={3}>Year 3</Select.Option>
                                                    <Select.Option value={4}>Year 4</Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item className={'w-1/2 md:w-3/12'}
                                                       {...restField}
                                                       name={[name, 'semester']}
                                                       rules={[
                                                           {
                                                               required: true,
                                                               message: 'Required'
                                                           }
                                                       ]}>
                                                <Select className={'w-1/2 md:w-3/12'} size={'large'} placeholder={'Semester'}>
                                                    <Select.Option value={1}>Sem 1</Select.Option>
                                                    <Select.Option value={2}>Sem 2</Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item className={'grow'}
                                                       {...restField}
                                                       name={[name, 'name']}
                                                       rules={[
                                                           {
                                                               required: true,
                                                               message: 'Required'
                                                           }
                                                       ]}>
                                                <Input className={'w-full'} size={'large'} placeholder="Module Name"/>
                                            </Form.Item>
                                        </div>
                                        <Button icon={<FiTrash/>} className={'btn'} danger size={'large'}
                                                onClick={() => remove(name)}/>
                                    </div>
                                ))}
                                <div className={'flex justify-end mb-5'}>
                                    <Button type="text"
                                            className={'btn text-sm text-gray-500 hover:!bg-transparent'}
                                            onClick={() => add()} icon={<FiPlus size={20}/>}>
                                        Add Module
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form.List>
                </Col>*/}
            </Row>
        </TlaFormWrapper>
    )
}

ProgramForm.propTypes = {
    addProgram: PropTypes.func.isRequired,
    updateProgram: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    addProgram: (payload) => dispatch(handleAddProgram(payload)),
    updateProgram: (payload) => dispatch(handleUpdateProgram(payload)),
})

export default connect(null, mapDispatchToProps)(ProgramForm)
