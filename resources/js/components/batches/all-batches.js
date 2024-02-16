import {Table, Tag} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect, useDispatch, useSelector} from "react-redux";
import {useOutletContext} from 'react-router'
import {handleGetAllBatches} from "../../actions/batches/BatchAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import BatchActions from "./batch-actions";
import {useLocation, useNavigate} from "react-router-dom";
import {getBatch} from "../../actions/batches/ActionCreators";

const {Column} = Table

function AllBatches(props) {
    const {getBatches, batches, filter} = props
    const {pathname} = useLocation()
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const {data, meta} = batches
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Batches', addLink: '/batches/form', buttonText: 'Batches'})

        if (pathname === '/my-batches') {
            filter.staff_id = loggedInUser.staff_id
        }
        filter.program_id = 'all'
        getBatches(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    const colors = {
        current: 'blue',
        completed: 'green',
        pending: 'red'
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const Details = (record) => {
        return {
            onClick: () => {
                dispatch(getBatch(record))
                navigate('detail')
            },
        };
    }

    return (
        <div className={'pb-10'}>
            {/*<FilterGetBatches/>*/}
            <TlaTableWrapper
                formLoading={loading}
                filterObj={filter}
                callbackFunction={getBatches}
                data={data} meta={meta}>
                <Column className={'cursor-pointer'} onCell={Details} title={'Program'} render={(text, {program, status}) => (
                    <>
                        <p>{program}</p>
                        <Tag color={colors[status]}>{status}</Tag>
                    </>
                )}/>
                <Column className={'cursor-pointer'} onCell={Details} title="room" dataIndex={'room'}/>
                <Column className={'cursor-pointer'} onCell={Details} title="instructor" dataIndex={'staff'}/>
                <Column className={'cursor-pointer'} onCell={Details} title="start time" dataIndex={'batch_time'}/>
                <Column className={'cursor-pointer'} onCell={Details} title="start date" dataIndex={'start_date'}/>
                <Column className={'cursor-pointer'} onCell={Details} title="end date" dataIndex={'end_date'}/>
                <Column className={'cursor-pointer'} onCell={Details} title={'Students'} dataIndex={"students"}/>
                <Table.Column title={'Actions'} render={(text, record) => (
                    <BatchActions record={record}/>
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
