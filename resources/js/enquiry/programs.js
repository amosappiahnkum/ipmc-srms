import {Checkbox, Col, Form, Input, Row} from 'antd'
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
        <React.Fragment>
            <div>
                <Form.Item rules={[
                    {
                        required: true,
                        message: 'Choose at least one program'
                    }
                ]} name="programs" label="">
                    <Checkbox.Group>
                        <div className={'grid grid-cols-1 md:grid-cols-3 gap-2'}>
                            {
                                programTypes.map((type, index) => (
                                    <div key={type} className={`p-2 rounded-lg bg-gray-${index + 1}00`}>
                                        <p className={'text-lg'}>{type}</p>
                                        <div className={'flex flex-col'}>
                                            {
                                                programs[type].map((program) => (
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
        </React.Fragment>
    )
}

Programs.propTypes = {
    getEnquiryPrograms: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    getEnquiryPrograms: (payload) => dispatch(handleGetEnquiryPrograms(payload))
})

export default connect(null, mapDispatchToProps)(Programs)
