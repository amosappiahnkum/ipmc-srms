import {Table} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetAllFollowUps} from "../../actions/follow-up/FollowUpAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import FilterFollowUps from "./filter-follow-ups";

function AllFollowUps(props) {
    const {getFollowUps, followUps, filter} = props
    const {data, meta} = followUps
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'FollowUps', addLink: '/registrations/form', buttonText: 'FollowUp'})

        getFollowUps(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={'pb-10'}>
            <FilterFollowUps/>
            <TlaTableWrapper
                formLoading={loading}
                filterObj={filter}
                callbackFunction={getFollowUps}
                data={data} meta={meta}>
                <Table.Column title={'student'} render={(text, {id, status, student}) => (
                    <>
                        <p>{student}</p>
                    </>
                )}/>
                <Table.Column title={'Date'} dataIndex={'follow_up_date'}/>
                <Table.Column title={'mode'} dataIndex={'mode'}/>
                <Table.Column title={'feedback'} dataIndex={'feedback'}/>
            </TlaTableWrapper>
        </div>
    )
}

AllFollowUps.propTypes = {
    pageInfo: PropTypes.object,
    getFollowUps: PropTypes.func,
    followUps: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    followUps: state.followUpReducer.followUps,
    filter: state.followUpReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getFollowUps: (payload) => dispatch(handleGetAllFollowUps(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllFollowUps)
