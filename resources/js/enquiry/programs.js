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
                <div className={'chat-content h-[calc(100vh-500px)] md:h-[calc(100vh-300px)]'}>
                    <div>
                        <Form.Item rules={[
                            {
                                required: true,
                                message: 'Choose at least one program'
                            }
                        ]} name="programs" label="">
                            <Checkbox.Group rootClassName={'program-check'}>
                                <div className={'grid grid-cols-1 md:grid-cols-3 gap-2'}>
                                    {
                                        programTypes.map((item, index) => (
                                            <div key={item} className={`p-2 rounded-lg bg-gray-${index + 1}00`}>
                                                <p className={'text-base'}>{item}</p>
                                                <div>
                                                    {
                                                        programs[item].map((program) => (
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
                                        ))
                                    }
                                </div>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="other_program" label="Any Other Program (Specify)">
                            <Input size={'large'}/>
                        </Form.Item>
                    </div>
                </div>
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
