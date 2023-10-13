import {Button, Table} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useOutletContext} from 'react-router'
import {Link} from "react-router-dom";
import {handleGetAllInstructors} from "../../actions/instructors/InstructorAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../commons/tla-add-new";

const {Column} = Table

function AllInstructors(props) {
    const {getInstructors, instructors, filter} = props
    const {data, meta} = instructors
    const [loading, setLoading] = useState(true)
    const {setPageInfo} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Instructors', addLink: '/instructors/form', buttonText: 'Instructor'})

        getInstructors(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={ 'pb-10' }>
            {/*<FilterInstructors/>*/}
            <TlaTableWrapper
                formLoading={ loading }
                filterObj={ filter }
                callbackFunction={ getInstructors }
                data={ data } meta={ meta }>
                <Column title="Name" render={ (_, {id, name}) => (
                    <Link to={ `/instructors/${ id }/${ name }/personal-details` } state={ {staffId: id} }>
                        {name}
                    </Link>
                ) }/>
                <Column title="phone_number" dataIndex={ 'phone_number' }/>
                <Column title="email" dataIndex={ 'email' }/>
                <Table.Column title={'Actions'} render={(text, record) => (
                    <TlaAddNew data={record} link={'form'}>
                        <Button>Edit</Button>
                    </TlaAddNew>
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

AllInstructors.propTypes = {
    pageInfo: PropTypes.object,
    getInstructors: PropTypes.func,
    instructors: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    instructors: state.instructorReducer.instructors,
    filter: state.instructorReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getInstructors: (payload) => dispatch(handleGetAllInstructors(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllInstructors)
