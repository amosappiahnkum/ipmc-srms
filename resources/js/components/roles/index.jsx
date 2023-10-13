import React, { useEffect, useState } from 'react'
import { Store } from '../../utils/Store'
import PropTypes from 'prop-types'
import { Drawer, Button, Spin, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import UserRole from './userRole'
import { getUserRoles } from '../../actions/users/UserAction'

export default function Roles (props) {
  const [loading, setLoading] = useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const showDrawer = () => {
    setLoading(true)
    dispatch(getUserRoles(props.userId)).then((res) => {
      setLoading(false)
      setVisible(true)
    }).catch(() => {
      notification.warning({
        message: 'Warning',
        description: 'Something went wrong'
      })
    })
  }

  const onClose = () => {
    setVisible(false)
  }
  return (
        <>
            <Button loading={loading} type={'default'} onClick={showDrawer}>
                {props.btnText}
            </Button>
            <Drawer title={props.username} placement="right" onClose={onClose} visible={visible} width={500}>
                {
                    loading === true
                      ? <Spin indicator={antIcon}/>
                      : <UserRole userId={props.userId} userRoles={props.userRoles}/>
                }
            </Drawer>
        </>
  )
}
Roles.propTypes = {
  btnText: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userRoles: PropTypes.array.isRequired,
}

Roles.defaultProps = {
  userRoles: []
}
