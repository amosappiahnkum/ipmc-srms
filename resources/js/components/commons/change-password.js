import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Form, Input, message, Spin} from 'antd'
import {handleChangePassword} from '../../actions/users/UserAction'
import {useNavigate} from "react-router-dom";
import {FiLock} from "react-icons/fi";

const ChangePassword = (props) => {
    const {changePassword} = props
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [, forceUpdate] = useState({})
    const onFinish = (values) => {
        setLoading(true)
        changePassword(values).then(() => {
            message.success('Password Changed Successfully')
            navigate('/')
        }).catch((err) => {
            message.error(err.response.data.message)
            setLoading(false)
        })
    }
    useEffect(() => {
        forceUpdate({})
    }, [])
    return (
        <div className={'w-9/12 md:w-2/6 mx-auto'}>
            <div className={'w-fit flex flex-col justify-center items-center mx-auto mb-2'}>
                <FiLock size={50}/>
                <h3>Change Password</h3>
            </div>
            <div className={'bg-white p-5 rounded-lg'}>
                <Spin spinning={loading}>
                    <Form layout={'vertical'}
                          form={form}
                          name="change password"
                          onFinish={onFinish}>
                        <Form.Item
                            hasFeedback
                            label="Current Password"
                            name="currentPassword"
                            rules={[{required: true, message: 'Current password is required!'}]}>
                            <Input.Password size={'large'}/>
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="New Password"
                            name="password"
                            rules={[{required: true, message: 'New password is required!'}]}>
                            <Input.Password size={'large'}/>
                        </Form.Item>
                        <Form.Item
                            name="password_confirmation"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!'
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(new Error('Passwords mismatch!'))
                                    }
                                })
                            ]}>
                            <Input.Password size={'large'}/>
                        </Form.Item>
                        <Form.Item
                            shouldUpdate>
                            {() => (
                                <Button
                                    loading={loading}
                                    block
                                    size={'large'}
                                    type="primary"
                                    htmlType="submit"
                                    disabled={
                                        !form.isFieldsTouched(true) ||
                                        !!form.getFieldsError().filter(({errors}) => errors.length).length
                                    }>
                                    Change Password
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </div>
    )
}

ChangePassword.propTypes = {
    changePassword: PropTypes.func.isRequired,
    authUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        authUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (data) => dispatch(handleChangePassword(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
