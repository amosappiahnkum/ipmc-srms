import React, {useState} from 'react'
import {Button, Checkbox, Col, Drawer, message, Spin, Tag, Typography} from 'antd'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {handleAssignPermissions, handleGetAllPermissions} from "../../actions/commons/CommonAction";

const Permissions = ({staffPermissions, getAllPermissions, assignPermission, permissions, staffId}) => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)

    const [checkedList, setCheckedList] = useState(staffPermissions)
    const plainOptions = Array.from({length: 70}, (_, idx) => ++idx)

    const [checkAll, setCheckAll] = useState(false)
    const [indeterminate, setIndeterminate] = useState(true)
    const onChange = list => {
        setCheckedList(list)
        setIndeterminate(!!list.length && list.length < plainOptions.length)
        setCheckAll(list.length === plainOptions.length)
    }

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? plainOptions : [])
        setIndeterminate(false)
        setCheckAll(e.target.checked)
    }

    const showDrawer = () => {
        setLoading(true)
        setVisible(true)
        getAllPermissions(staffId).then(() => {
            setLoading(false)
        })
    }

    const onClose = () => {
        setVisible(false)
    }
    const savePermissions = () => {
        setLoading(true)
        const data = {
            permissions: checkedList,
            staffId: staffId
        }
        assignPermission(data).then(() => {
            setLoading(false)
            message.success('Permission(s) assigned successfully')
            setVisible(false)
        }).catch(() => {
            message.error('Something went wrong')
        })
    }

    return (
        <Spin spinning={ loading }>
            <Tag color={ 'cyan' } onClick={ showDrawer } style={ {cursor: 'pointer'} }>{ staffPermissions.length }</Tag>
            <Drawer
                width={ '100%' }
                title="Staff Permissions"
                placement="right"
                onClose={ onClose }
                open={ visible }
                extra={ [
                   <div key={'action'} className={'flex items-center gap-2'}>
                       <Checkbox key={ 'check-all' } indeterminate={ indeterminate } onChange={ onCheckAllChange }
                                 checked={ checkAll }>
                           Check all
                       </Checkbox>
                       <Button key={ 'save' } disabled={ checkedList.length === 0 && staffPermissions.length === 0 }
                               type={ 'primary' } onClick={ savePermissions }>Save</Button>
                   </div>
                ] }>

                <Checkbox.Group value={ checkedList } onChange={ onChange }>
                    <div className={'flex flex-wrap flex-col md:flex-row gap-2'}>
                        {
                            Object.keys(permissions).map((option, index) => {
                                return <div key={ option + index }>
                                    <Typography.Title level={ 5 }>{ option }</Typography.Title>
                                    {
                                        permissions[option].map((opt) => {
                                            return <Col key={ opt.id } span={ 24 }>
                                                <Checkbox value={ opt.id } className={'capitalize'}>{ opt.name.replaceAll('-', ' ') }</Checkbox>
                                            </Col>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </Checkbox.Group>
            </Drawer>
        </Spin>
    )
}

Permissions.propTypes = {
    staffId: PropTypes.number.isRequired,
    staffPermissions: PropTypes.array.isRequired,
    permissions: PropTypes.object.isRequired,
    assignPermission: PropTypes.func.isRequired,
    getAllPermissions: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        permissions: state.commonReducer.commons.permissions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPermissions: (staffId) => dispatch(handleGetAllPermissions(staffId)),
        assignPermission: (data) => dispatch(handleAssignPermissions(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions)
