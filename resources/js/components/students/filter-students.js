import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Col, Row} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportStudents, handleGetAllStudents} from "../../actions/students/StudentAction";
import AllProgramsFilter from "../../commons/filter/all-programs-filter";

function FilterStudents(props) {
    const {submitFilter, filter, exportFilter} = props

    const initials = {
        ...filter,
        export: false
    }

    return (
        <FilterWrapper excel initialValue={initials} submitFilter={submitFilter} exportFilter={exportFilter}>
            <Row gutter={10}>
                <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                    <AllProgramsFilter/>
                </Col>
            </Row>
        </FilterWrapper>
    )
}

FilterStudents.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object
}

const mapStateToProps = (state) => ({
    filter: state.studentReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllStudents(params)),
    exportFilter: (params) => dispatch(handleExportStudents(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterStudents)
