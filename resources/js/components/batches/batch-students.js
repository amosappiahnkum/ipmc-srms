import {Table} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {handleGetBatchStudents} from "../../actions/batches/BatchAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";

const {Column} = Table

function BatchStudents(props) {
    const {getBatchStudents, batchStudents, batchId} = props
    const {data, meta} = batchStudents
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getBatchStudents(batchId).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <TlaTableWrapper
            numberColumn={false}
            formLoading={loading}
            filterObj={{}}
            showHeader={false}
            callbackFunction={getBatchStudents}
            data={data} meta={meta}>
            <Column render={({student}) => (
                <div>
                    <p>{student?.name}</p>
                    <p className={'text-xs'}>
                        <span> <a href={`tel:${student?.phone_number}`}>{student?.phone_number}</a></span>
                        <span> | <a href={`mailto:${student?.email}`}>{student?.email}</a></span>
                    </p>
                </div>
            )}/>
        </TlaTableWrapper>
    )
}

BatchStudents.propTypes = {
    batchId: PropTypes.number.isRequired,
    getBatchStudents: PropTypes.func,
    batchStudents: PropTypes.object
}

const mapStateToProps = (state) => ({
    batchStudents: state.batchReducer.batchStudents
})

const mapDispatchToProps = (dispatch) => ({
    getBatchStudents: (batchId) => dispatch(handleGetBatchStudents(batchId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BatchStudents)
