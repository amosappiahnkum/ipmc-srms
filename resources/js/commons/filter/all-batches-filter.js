import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect, useSelector} from "react-redux";
import TlaSelect from "../../commons/tla/TlaSelect";
import {handleGetAllBatch} from "../../actions/batches/BatchAction";

function AllBatchesFilter({getBatches, callBack, required, self}) {
    const [loading, setLoading] = useState(false)
    const programs = useSelector(state => state.batchReducer.allBatches)

    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    return (
        <TlaSelect
            loading={loading}
            name={'batch_id'}
            optionKey={'name'}
            options={programs}
            label={'program'} required={required}
            onFocus={() => {
                if (programs.length === 0) {
                    setLoading(true)
                    getBatches(self ? new URLSearchParams({staff_id: loggedInUser?.staff_id}) : null).then(() => setLoading(false))
                }
            }}
            onChange={(value) => {
                callBack && callBack(programs.find(pro => pro.id === value))
            }}
        />
    )
}

AllBatchesFilter.defaultProps = {
    callBack: null,
    required: false,
    self: false
}

AllBatchesFilter.propTypes = {
    getBatches: PropTypes.func,
    callBack: PropTypes.func,
    required: PropTypes.bool,
    self: PropTypes.bool
}

const mapDispatchToProps = (dispatch) => ({
    getBatches: (params) => dispatch(handleGetAllBatch(params)),
})

export default connect(null, mapDispatchToProps)(AllBatchesFilter)
