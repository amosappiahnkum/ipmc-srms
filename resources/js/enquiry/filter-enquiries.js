import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Col, Row} from "antd";
import FilterWrapper from "../commons/filter/filter-wrapper";
import {handleExportEnquiries, handleGetAllEnquiries} from "../actions/enquiry/EnquiryAction";
import DateFilter from "../commons/filter/date-filter";
import {dateRange} from "../utils";
import AllProgramsFilter from "../commons/filter/all-programs-filter";

function FilterEnquiries(props) {
    const {submitFilter, filter, exportFilter} = props
    const initials = {
        ...filter,
        date: filter.date === 'null' ? ['', ''] : dateRange(filter.date.split(',')),
        export: false
    }

    return (
        <FilterWrapper
            excel
            initialValue={initials}
            submitFilter={submitFilter}
            exportFilter={exportFilter}>
            <Row gutter={10}>
                <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                    <DateFilter/>
                </Col>
                <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                    <AllProgramsFilter/>
                </Col>
            </Row>
        </FilterWrapper>
    )
}

FilterEnquiries.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object
}

const mapStateToProps = (state) => ({
    filter: state.enquiryReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllEnquiries(params)),
    exportFilter: (params) => dispatch(handleExportEnquiries(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterEnquiries)
