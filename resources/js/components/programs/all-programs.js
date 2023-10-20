import {Space, Table, Tag} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetAllPrograms} from "../../actions/programs/ProgramAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";

const {Column} = Table

function AllPrograms(props) {
    const {getPrograms, programs, filter} = props
    const {data, meta} = programs
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Programs', addLink: '/programs/form', buttonText: 'Program'})

        getPrograms(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={ 'pb-10' }>
            {/*<FilterPrograms/>*/}
            <TlaTableWrapper
                formLoading={ loading }
                filterObj={ filter }
                callbackFunction={ getPrograms }
                data={ data } meta={ meta }>
                <Column title="Duration" render={(text, { name, program_type, year }) => (
                    <Space direction={'vertical'}>
                        {name}
                        <Space>
                            <Tag color={'blue-inverse'}>{program_type}</Tag>
                            {year && <Tag color={'blue'}>{year}</Tag> }
                        </Space>
                    </Space>
                )}/>
                <Column title="Duration" render={(text, record) => (
                    <>{record.duration +' ' + record.type}</>
                )}/>
                <Column title="Fee" dataIndex={ 'fee' }/>
                <Column title="Total Fee" dataIndex={ 'total_fee' }/>
                <Column title="Installments" dataIndex={ 'installments' }/>
                <Column title="Total Students" dataIndex={ 'students' }/>
                {/*<Table.Column title={'Actions'} render={(text, record) => (
                    <TlaAddNew data={record} link={'form'}>
                        <Button>Edit</Button>
                    </TlaAddNew>
                )}/>*/}
            </TlaTableWrapper>
        </div>
    )
}

AllPrograms.propTypes = {
    pageInfo: PropTypes.object,
    getPrograms: PropTypes.func,
    programs: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    programs: state.programReducer.programs,
    filter: state.programReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getPrograms: (payload) => dispatch(handleGetAllPrograms(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllPrograms)
