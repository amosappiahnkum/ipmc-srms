import React, {useEffect} from 'react'
import {Button, Table, Space} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import { useOutletContext } from 'react-router'
import TlaImage from "../../../../commons/tla-image";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
const { Column } = Table
const test = [
    {
        id: 1,
        name: 'Darrell Steward',
        staffId: '766360',
        feedbackType: 'Social Skills',
        key: 'name',
    },
    {
        id: 2,
        name: 'Devon Lane',
        staffId: '766360',
        feedbackType: "Life Management",
        key: 'name',
    },
    {
        id: 3,
        name: 'Cameron Williamson',
        staffId: '766360',
        feedbackType: "General",
        key: 'name',
    },
    {
        id: 4,
        name: 'Darrell Steward',
        staffId: '766360',
        feedbackType: 'Social Skills',
        key: 'name',
    },
    {
        id: 5,
        name: 'Darrell Steward',
        staffId: '766360',
        feedbackType: 'Social Skills',
        key: 'name',
    },
    {
        id: 6,
        name: 'Darrell Steward',
        staffId: '766360',
        feedbackType: 'Social Skills',
        key: 'name',
    },
    {
        id: 7,
        name: 'Darrell Steward',
        staffId: '766360',
        feedbackType: 'Social Skills',
        key: 'name',
    },
    {
        id: 8,
        name: 'Darrell Steward',
        staffId: '766360',
        feedbackType: 'Social Skills',
        key: 'name',
    },
];
function Users (props) {
    const { setPageInfo, setExtra } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Users', addLink: '/pim/add', buttonText: 'Users' })
    }, [])

    return (
        <TlaTableWrapper callbackFunction={() => {}} data={test}>
            <Column title="Name" render={(_, record) => (
                <Space>
                    <TlaImage size={40} src={'Avatar'}/>
                    <Space direction={'vertical'} size={1}>
                        {record.name}
                        {record.staffId}
                    </Space>
                </Space>
            )}/>
            <Column title="Contact" render={(_, record) => (
                <Space direction={'vertical'} size={1}>
                    {record.name}
                    {record.staffId}
                </Space>
            )}/>
            <Column title="Contact" render={(_, record) => (
                <Space direction={'vertical'} size={1}>
                    {record.name}
                    {record.staffId}
                </Space>
            )}/>
        </TlaTableWrapper>
    )
}

Users.propTypes = {
    pageInfo: PropTypes.object,
}

export default connect()(Users)
