import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { List, Button, Select, Form, Input, notification, Switch } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { Store } from '../../utils/Store'
import { useDispatch } from 'react-redux'
import { addUserRoles, roleActions } from '../../actions/users/UserAction'

const { Option } = Select
export default function UserRole (props) {
  const [loading, setLoading] = useState(false)
  const state = Store.getState()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const submit = (values) => {
    setLoading(true)
    dispatch(addUserRoles(values)).then(() => {
      notification.success({
        message: 'Success',
        description: 'Role(s) Added'
      })
      form.resetFields()
      setLoading(false)
    }).catch((error) => {
      notification.warning({
        message: 'Warning',
        description: error.response.data
      })
    })
  }

  const handleRoleActions = (id, userId, type) => {
    setLoading(true)
    const data = {
      id: id,
      userId: userId,
      type: type
    }

    dispatch(roleActions(data)).then(() => {
      notification.success({
        message: 'Success',
        description: 'Role ' + (type === 'delete' ? 'Deactivated' : 'Activated')
      })
      // form.resetFields()
      setLoading(false)
    }).catch((error) => {
      notification.warning({
        message: 'Warning',
        description: error.response.data
      })
    })
  }

  return (
        <>
              <List size="small" itemLayout="horizontal" dataSource={props.userRoles}
                  renderItem={role => (
                      <List.Item>
                          <List.Item.Meta
                              title={role.name}
                          />
                          <div>
                              <Switch
                                  loading={loading}
                                  onClick={() => { handleRoleActions(role.id, role.pivot.userId, role.pivot.deleted_at === null ? 'delete' : 'restore') }}
                                  checkedChildren={<CheckOutlined />}
                                  unCheckedChildren={<CloseOutlined />}
                                  checked={role.pivot.deleted_at === null}
                              />
                          </div>
                      </List.Item>
                  )}/>
            {
                state.userReducer.otherRoles.length > 0 &&
                <Form form={form} onFinish={submit} onFinishFailed={{}} layout="vertical" name="addUserRoleForm"
                      initialValues={{
                        userId: props.userId
                      }}>
                    <Form.Item hidden name="userId" label="ID"
                               rules={[
                                 {
                                   required: true,
                                   message: 'Required'
                                 }
                               ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="roles" label="Add Roles"
                               rules={[
                                 {
                                   required: true,
                                   message: 'Select at least 1 role'
                                 }
                               ]}>
                        <Select
                            mode="multiple"
                            maxTagCount={'responsive'}
                            placeholder="Select role" allowClear>
                            {
                                state.userReducer.otherRoles.map((role) => {
                                  return (
                                        <Option key={role.id} value={role.id}>{role.name}</Option>
                                  )
                                })
                            }

                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <div align={'right'}>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Add
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            }

        </>
  )
}
UserRole.propTypes = {
  userId: PropTypes.string.isRequired,
  userRoles: PropTypes.array,
}
