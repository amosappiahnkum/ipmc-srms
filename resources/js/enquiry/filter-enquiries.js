import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect, useSelector} from "react-redux";
import {Col, Row} from "antd";
import {handleGetAllPrograms} from "../actions/programs/ProgramAction";
import FilterWrapper from "../commons/filter/filter-wrapper";
import {handleExportEnquiries, handleGetAllEnquiries} from "../actions/enquiry/EnquiryAction";
import TlaSelect from "../commons/tla/TlaSelect";
import DateFilter from "../commons/filter/date-filter";
import {dateRange} from "../utils";

function FilterEnquiries(props) {
    const [loading, setLoading] = useState(false)
    const {submitFilter, filter, exportFilter, getPrograms} = props
    const programs = useSelector(state => state.programReducer.programs.data)
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
                    <TlaSelect
                        loading={loading}
                        hasAll
                        name={'program_id'}
                        optionKey={'name'}
                        options={programs}
                        label={'program'}
                        onFocus={() => {
                            if (programs.length === 0) {
                                setLoading(true)
                                getPrograms().then(() => setLoading(false))
                            }

                        }}
                    />
                </Col>
            </Row>
        </FilterWrapper>
    )
}

FilterEnquiries.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    getPrograms: PropTypes.func,
    filter: PropTypes.object
}

const mapStateToProps = (state) => ({
    filter: state.enquiryReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllEnquiries(params)),
    exportFilter: (params) => dispatch(handleExportEnquiries(params)),
    getPrograms: (params) => dispatch(handleGetAllPrograms(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterEnquiries)
