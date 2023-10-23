import {Button, Space, Table, Tag, Typography} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetAllStaff} from "../../actions/staff/StaffAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../commons/tla-add-new";
import Permissions from "../config/permissions";

const {Column} = Table

function AllStaff(props) {
    const {getStaff, staffs, filter} = props
    const {data, meta} = staffs
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Staff', addLink: '/staff/form', buttonText: 'Staff'})

        getStaff(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    const colors = {
        instructor : 'blue',
        administrator: 'green',
        counselor: 'red',
        cashier: 'purple'
    }

    return (
        <div className={'pb-10'}>
            {/*<FilterStaff/>*/}
            <TlaTableWrapper
                formLoading={loading}
                filterObj={filter}
                callbackFunction={getStaff}
                data={data} meta={meta}>
                <Column title="Name" render={(_, {name, type}) => (
                    <Space direction={'vertical'}>
                        <Typography.Text>{name}</Typography.Text>
                        <Tag color={colors[type]}>{type}</Tag>
                    </Space>
                )}/>
                <Column title="username" dataIndex={'username'}/>
                <Column title="phone number" dataIndex={'phone_number'}/>
                <Column title="email" dataIndex={'email'}/>
                <Column title="Permissions" render={(_, {permissions, id}) => (
                    <Permissions staffPermissions={permissions ?? []} staffId={id}/>
                )}/>
                <Table.Column title={'Actions'} render={(text, record) => (
                    <TlaAddNew data={record} link={'form'}>
                        <Button>Edit</Button>
                    </TlaAddNew>
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

AllStaff.propTypes = {
    pageInfo: PropTypes.object,
    getStaff: PropTypes.func,
    staffs: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    staffs: state.staffReducer.staffs,
    filter: state.staffReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getStaff: (payload) => dispatch(handleGetAllStaff(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllStaff)
