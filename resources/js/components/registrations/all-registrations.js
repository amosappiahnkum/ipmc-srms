import {Table} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetAllRegistrations} from "../../actions/registrations/RegistrationAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import RegistrationActions from "./registration-actions";

const {Column} = Table

function AllRegistrations(props) {
    const {getRegistrations, registrations, filter} = props
    const {data, meta} = registrations
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Registrations', addLink: '/registrations/form', buttonText: 'Registration'})

        getRegistrations(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={'pb-10'}>
            <TlaTableWrapper
                formLoading={loading}
                filterObj={filter}
                callbackFunction={getRegistrations}
                data={data} meta={meta}>
                <Column title="Program" dataIndex={['ongoing_program', 'name']}/>
                <Table.Column title={'student'} render={(text, {id, status, student}) => (
                    <>
                        <p>{student}</p>
                        <RegistrationActions id={id} status={status}/>
                    </>
                )}/>
                <Table.Column title={'total fee'} dataIndex={'total_course_fee'}/>
                <Table.Column title={'reg. fee'} dataIndex={'registration_fee'}/>
                <Table.Column title={'discounted fee'} dataIndex={'discounted_fee'}/>
                <Table.Column title={'net payable fee'} dataIndex={'net_payable_fee'}/>
            </TlaTableWrapper>
        </div>
    )
}

AllRegistrations.propTypes = {
    pageInfo: PropTypes.object,
    getRegistrations: PropTypes.func,
    registrations: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    registrations: state.registrationReducer.registrations,
    filter: state.registrationReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getRegistrations: (payload) => dispatch(handleGetAllRegistrations(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRegistrations)
