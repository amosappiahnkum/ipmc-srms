import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Col, Row} from "antd";
import FilterWrapper from "../../commons/filter/filter-wrapper";
import AllProgramsFilter from "../../commons/filter/all-programs-filter";
import {dateRange} from "../../utils";
import DateFilter from "../../commons/filter/date-filter";
import {handleExportFollowUps, handleGetAllFollowUps} from "../../actions/follow-up/FollowUpAction";

function FilterFollowUps(props) {
    const [open, setOpen] = useState(false);
    const {submitFilter, filter, exportFilter} = props

    const initials = {
        ...filter,
        date: filter.date === 'null' ? ['', ''] : dateRange(filter.date.split(',')),
        export: false
    }

    return (
        <>
            <FilterWrapper
                open={open}
                onClose={() => setOpen(false)}
                excel initialValue={initials} submitFilter={submitFilter} exportFilter={exportFilter}>
                <Row gutter={10}>
                    <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                        <DateFilter/>
                    </Col>
                    <Col span={6}>
                        <AllProgramsFilter/>
                    </Col>
                </Row>
            </FilterWrapper>
        </>
    )
}

FilterFollowUps.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object
}

const mapStateToProps = (state) => ({
    filter: state.followUpReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllFollowUps(params)),
    exportFilter: (params) => dispatch(handleExportFollowUps(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterFollowUps)
