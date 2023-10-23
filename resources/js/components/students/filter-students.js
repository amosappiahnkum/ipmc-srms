import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Button, Col, Row} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import {handleExportStudents, handleGetAllStudents} from "../../actions/students/StudentAction";
import AllProgramsFilter from "../../commons/filter/all-programs-filter";
import {FiFilter} from "react-icons/fi";
import TlaSearch from "../../commons/search/tla-search";

function FilterStudents(props) {
    const [open, setOpen] = useState(false);
    const {submitFilter, filter, exportFilter} = props

    const initials = {
        ...filter,
        export: false
    }

    return (
        <>
            <FilterWrapper
                open={open}
                onClose={() => setOpen(false)}
                excel initialValue={initials} submitFilter={submitFilter} exportFilter={exportFilter}>
                <Row gutter={10}>
                    <Col span={6}>
                        <AllProgramsFilter/>
                    </Col>
                </Row>
            </FilterWrapper>
        </>
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
