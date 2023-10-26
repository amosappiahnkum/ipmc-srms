import {Checkbox, Form, Input, Spin} from 'antd'
import React, {useEffect, useState} from 'react'
import {connect, useSelector} from "react-redux";
import {handleGetEnquiryPrograms} from "../actions/enquiry/EnquiryAction";
import PropTypes from "prop-types";

function Programs({getEnquiryPrograms}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getEnquiryPrograms().then(() => setLoading(false))
    }, [])

    const programs = useSelector(state => state.enquiryReducer.enquiryPrograms)

    const programTypes = Object.keys(programs)

    return (
        <Spin spinning={loading}>
            {
                !loading &&
                <>
                    <div>
                        <Form.Item rules={[
                            {
                                required: true,
                                message: 'Choose at least one program'
                            }
                        ]} name="programs" label="">
                            <Checkbox.Group>
                                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                                    <div className={`p-2 rounded-lg bg-gray-100`}>
                                        <p className={'text-lg'}>{programTypes[0]}</p>
                                        <div>
                                            {
                                                programs[programTypes[0]].map((program) => (
                                                    <Checkbox
                                                        key={program.id}
                                                        value={program.id}
                                                        style={{lineHeight: '32px'}}>
                                                        {program.name}
                                                    </Checkbox>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div className={'p-2 rounded-lg bg-gray-200 mb-2'}>
                                            <p className={'text-lg'}>{programTypes[1]}</p>
                                            <div>
                                                {
                                                    programs[programTypes[1]].map((program) => (
                                                        <Checkbox
                                                            key={program.id}
                                                            value={program.id}
                                                            style={{lineHeight: '32px'}}>
                                                            {program.name}
                                                        </Checkbox>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={'p-2 rounded-lg bg-gray-200'}>
                                            <p className={'text-lg'}>{programTypes[2]}</p>
                                            <div>
                                                {
                                                    programs[programTypes[2]].map((program) => (
                                                        <Checkbox
                                                            key={program.id}
                                                            value={program.id}
                                                            style={{lineHeight: '32px'}}>
                                                            {program.name}
                                                        </Checkbox>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="other_program" label="Any Other Program (Specify)">
                            <Input size={'large'}/>
                        </Form.Item>
                    </div>
                </>
            }

        </Spin>
    )
}

Programs.propTypes = {
    getEnquiryPrograms: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    getEnquiryPrograms: (payload) => dispatch(handleGetEnquiryPrograms(payload))
})

export default connect(null, mapDispatchToProps)(Programs)
