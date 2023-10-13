import {Button, Table} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {Link} from "react-router-dom";
import {handleGetAllBatches} from "../../actions/batches/BatchAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../commons/tla-add-new";

const {Column} = Table

function AllBatches(props) {
    const {getBatches, batches, filter} = props
    const {data, meta} = batches
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Get Batches', addLink: '/batches/form', buttonText: 'Batches'})

        getBatches(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={ 'pb-10' }>
            {/*<FilterGetBatches/>*/}
            <TlaTableWrapper
                formLoading={ loading }
                filterObj={ filter }
                callbackFunction={ getBatches }
                data={ data } meta={ meta }>
                <Column title="Program" dataIndex={'program'}/>
                <Column title="instructor" dataIndex={ 'instructor' }/>
                <Column title="start time" dataIndex={ 'batch_time' }/>
                <Column title="start date" dataIndex={ 'start_date' }/>
                <Column title="end date" dataIndex={ 'end_date' }/>
                <Column title="Students" dataIndex={ 'students' }/>
                <Table.Column title={'Actions'} render={(text, record) => (
                    <TlaAddNew data={record} link={'form'}>
                        <Button>Edit</Button>
                    </TlaAddNew>
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

AllBatches.propTypes = {
    pageInfo: PropTypes.object,
    getBatches: PropTypes.func,
    batches: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    batches: state.batchReducer.batches,
    filter: state.batchReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getBatches: (payload) => dispatch(handleGetAllBatches(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBatches)
