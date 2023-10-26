import {Table} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetBatchStudents} from "../../actions/batches/BatchAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useLocation} from "react-router-dom";

const {Column} = Table

function BatchStudents(props) {
    const {getBatches, batchStudents} = props
    const {state} = useLocation()
    const {data, meta} = batchStudents
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Batches', addLink: '/batches/form', buttonText: 'Batches'})
        getBatches(state?.data?.id).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={'pb-10'}>
            <div className={'p-2 border rounded-lg w-fit mb-2'}>
                <p className={'text-lg'}>{`${state.data.program} | ${state.data.staff} | ${state.data.batch_time}`}</p>
            </div>
            <TlaTableWrapper
                formLoading={loading}
                filterObj={{}}
                callbackFunction={getBatches}
                data={data} meta={meta}>
                <Column title="Name" dataIndex={['student', 'name']}/>
                <Column title="Phone Number" dataIndex={['student', 'phone_number']}/>
                <Column title="Email" dataIndex={['student', 'email']}/>
            </TlaTableWrapper>
        </div>
    )
}

BatchStudents.propTypes = {
    pageInfo: PropTypes.object,
    getBatches: PropTypes.func,
    batchStudents: PropTypes.object
}

const mapStateToProps = (state) => ({
    batchStudents: state.batchReducer.batchStudents
})

const mapDispatchToProps = (dispatch) => ({
    getBatches: (batchId) => dispatch(handleGetBatchStudents(batchId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BatchStudents)
